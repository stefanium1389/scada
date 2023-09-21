using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using scada_back.Context;
using scada_back.Models;
using System;
using System.Diagnostics;
using System.Net;
using System.Reflection.Metadata;
using System.Threading;

namespace scada_back.Services
{
    public interface IStartService
    {
        void Start();
        void Stop();
        void Restart();
    }
    public class StartService: IStartService
    {
        public object _lock = new object();
        private ManualResetEvent allThreadsStopped = new ManualResetEvent(true);

        public ScadaDbContext Context { get; set; }
        public IServiceProvider _serviceProvider { get; set; }
        public GlobalVariables GlobalVariables { get; set; }
        public Random random { get; set; } = new Random();

        public StartService(ScadaDbContext context, IServiceProvider serviceProvider) {  Context = context; GlobalVariables = GlobalVariables.Instance; _serviceProvider = serviceProvider; }

        public void Start() {
            Console.WriteLine("Starting simulation...");
            foreach (var address in Context.Addresses)
            {
                StartAddressThread(address);
            }
            foreach (var analog in Context.AnalogInputs.Include(a => a.Address).Include(a => a.Alarms))
            {
                StartAnalogThread(analog);
            }
            foreach (var digital in Context.DigitalInputs.Include(d => d.Address))
            {
                StartDigitalThread(digital);
            }
            GlobalVariables.SimulationRunning = true;
        }
        private void DigitalReading(DigitalInput digital, CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                using (var dbContext = getNewScadaDbContext())
                {
                    digital = dbContext.DigitalInputs.Include(a => a.Address).FirstOrDefault(d => d.Id == digital.Id);
                }
                double realValue = 0;
                if (GlobalVariables.AddressValues.ContainsKey(digital.Address.Id))
                {
                    realValue = GlobalVariables.AddressValues[digital.Address.Id];
                }
                bool readValue;
                if (realValue > 0)
                {
                    readValue = true;
                }
                else
                {
                    readValue = false;
                }
                var digitalVal = new DigitalInputValue();
                digitalVal.Value = readValue;
                digitalVal.DigitalInputId = digital.Id;
                digitalVal.TimeStamp = DateTime.Now;
                using (var dbContext = getNewScadaDbContext())
                {
                    dbContext.DigitalInputValues.Add(digitalVal);
                    dbContext.SaveChanges();
                }
                Thread.Sleep(digital.ScanTime);
            }

            Console.WriteLine($"Stopped Digital {digital.Id}");
        }
        private void AddressReading(Address address, CancellationToken cancellationToken)
        {
            lock (_lock)
            {
                using (var dbContext = getNewScadaDbContext())
                {
                    foreach (RealTimeUnit rtu in dbContext.RealTimeUnits.Include(a => a.Address))
                    {
                        GlobalVariables.AddressRTU[rtu.Address.Id] = rtu.Id;
                    }
                }
            }
            while (!cancellationToken.IsCancellationRequested)
            {
                if (address.Driver == Driver.SIMULATION)

                {
                    if (address.Function == Function.SIN)
                    {
                        lock (_lock)
                        {
                            GlobalVariables.AddressValues[address.Id] = SimulationDriver.Sine();
                        }
                    }
                    if (address.Function == Function.COS)
                    {
                        lock (_lock)
                        {
                            GlobalVariables.AddressValues[address.Id] = SimulationDriver.Cosine();
                        }
                    }
                    if (address.Function == Function.RAMP)
                    {
                        lock (_lock)
                        {
                            GlobalVariables.AddressValues[address.Id] = SimulationDriver.Ramp();
                        }
                    }
                    Thread.Sleep((int)address.SimGenerateTime);
                }


                if (address.Driver == Driver.RTU)
                {
                    if (GlobalVariables.AddressRTU.ContainsKey(address.Id))
                    {
                        var rtuId = GlobalVariables.AddressRTU[address.Id];
                        RealTimeUnit rtu;
                        using (var dbContext = getNewScadaDbContext())
                        {
                            rtu = dbContext.RealTimeUnits.FirstOrDefault(i => i.Id == rtuId);
                        }
                        double value = random.NextDouble() * (rtu!.MaxValue - rtu.MinValue) + rtu.MinValue;
                        lock (_lock)
                        {
                            GlobalVariables.AddressValues[address.Id] = value;
                        }
                        Thread.Sleep(rtu.GenerateTime);
                    }
                    
                }
            }

            Console.WriteLine($"Stopped Address {address.Id}");
            
        }
        public void AnalogReading(AnalogInput analog, CancellationToken cancellationToken) {

            while (!cancellationToken.IsCancellationRequested)
            {
                using (var dbContext = getNewScadaDbContext())
                {
                    analog = dbContext.AnalogInputs.Include(a => a.Address).Include(a => a.Alarms).FirstOrDefault(a => a.Id == analog.Id);
                }
                if (analog.IsScanning)
                {
                    lock (_lock)
                    {
                        GlobalVariables.TagCurrentActivatedAlarm[analog.Id] = null;
                    }
                    var analogValue = new AnalogInputValue();
                    analogValue.AnalogInputId = analog.Id;
                    analogValue.TimeStamp = DateTime.Now;
                    double realValue = 0;
                    if (GlobalVariables.AddressValues.ContainsKey(analog.Address.Id))
                    {
                        realValue = GlobalVariables.AddressValues[analog.Address.Id];
                    }
                    double savedValue;
                    if (realValue < analog.LowLimit)
                    {
                        savedValue = analog.LowLimit;
                    }
                    else if (realValue > analog.HighLimit)
                    {
                        savedValue = analog.HighLimit;
                    }
                    else
                    {
                        savedValue = realValue;
                    }
                    analogValue.Value = savedValue;
                    using (var dbContext = getNewScadaDbContext())
                    {
                        dbContext.AnalogInputValues.Add(analogValue);
                        dbContext.SaveChanges();
                    }
                    Alarm highestPriorityAlarm = null;
                    foreach (Alarm alarm in analog.Alarms)
                    {
                        if ((alarm.Type == AlarmType.LOW && savedValue < alarm.Limit) || (alarm.Type == AlarmType.HIGH && savedValue > alarm.Limit))
                        {
                            if (highestPriorityAlarm == null || alarm.Priority > highestPriorityAlarm.Priority)
                            {
                                highestPriorityAlarm = alarm; 
                            }
                        }
                        if (highestPriorityAlarm != null)
                        {
                            ActivatedAlarm aa = new ActivatedAlarm();
                            aa.AlarmId = highestPriorityAlarm.Id;
                            aa.TimeStamp = DateTime.Now;
                            using (var dbContext = getNewScadaDbContext())
                            {
                                dbContext.ActivatedAlarms.Add(aa);
                                dbContext.SaveChanges();
                            }
                            aa.TargetAlarm = highestPriorityAlarm;

                            lock (_lock)
                            {
                                GlobalVariables.TagCurrentActivatedAlarm[analog.Id] = aa;
                            }
                            LogActivatedAlarm(aa);
                        }                        
                    }
                }
                Thread.Sleep(analog.ScanTime);
            }

            Console.WriteLine($"Stopped Analog {analog.Id}");
        }
        public void Stop()
        {
            foreach (var address in Context.Addresses)
            {
                StopAddressThread(address.Id);
            }
            foreach (var analog in Context.AnalogInputs.Include(a => a.Address).Include(a => a.Alarms))
            {
                StopAnalogThread(analog.Id);
            }
            foreach (var digital in Context.DigitalInputs.Include(d => d.Address))
            {
                StopDigitalThread(digital.Id);
            }
            Console.WriteLine("stopped all threads!");
            GlobalVariables.SimulationRunning = false;

        }
        public void StopAddressThread(int addressId)
        {
            if (GlobalVariables.AddressCancellationToken.ContainsKey(addressId))
            {
                GlobalVariables.AddressCancellationToken[addressId].Cancel();
            }
            if (GlobalVariables.AddressThread.ContainsKey(addressId))
            {
                GlobalVariables.AddressThread.Remove(addressId);
            }
        }
        public void StopAnalogThread(int analogId)
        {
            if (GlobalVariables.AnalogCancellationToken.ContainsKey(analogId))
            {
                GlobalVariables.AnalogCancellationToken[analogId].Cancel();
            }
            if (GlobalVariables.AnalogInputThread.ContainsKey(analogId))
            {
                GlobalVariables.AnalogInputThread.Remove(analogId);
            }
        }
        public void StopDigitalThread(int digitalId)
        {
            if (GlobalVariables.DigitalCancellationToken.ContainsKey(digitalId))
            {
                GlobalVariables.DigitalCancellationToken[digitalId].Cancel();
            }
            if (GlobalVariables.DigitalInputThread.ContainsKey(digitalId))
            {
                GlobalVariables.DigitalInputThread.Remove(digitalId);
            }
        }
        public void StartAddressThread(Address address)
        {
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;

            var thread = new Thread(() =>
            {
                AddressReading(address, cancellationToken);
            }
                );
            thread.IsBackground = true;
            thread.Start();
            GlobalVariables.AddressThread[address.Id] = thread;
            GlobalVariables.AddressCancellationToken[address.Id] = cancellationTokenSource;
        }
        public void StartAnalogThread(AnalogInput analog)
        {
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;

            var thread = new Thread(() =>
            {
                AnalogReading(analog, cancellationToken);
            }
                    );
            thread.IsBackground = true;
            thread.Start();
            GlobalVariables.AnalogInputThread[analog.Id] = thread;
            GlobalVariables.AnalogCancellationToken[analog.Id] = cancellationTokenSource;

        }
        public void StartDigitalThread(DigitalInput digital) 
        {
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;

            var thread = new Thread(() =>
                {
                    DigitalReading(digital, cancellationToken);
                }
            );
            thread.IsBackground = true;
            thread.Start();
            GlobalVariables.DigitalInputThread[digital.Id] = thread;
            GlobalVariables.DigitalCancellationToken[digital.Id] = cancellationTokenSource;
        }

        private ScadaDbContext getNewScadaDbContext()
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            string connectionString = configuration.GetConnectionString("Tim6ScadaConnection");

            DbContextOptionsBuilder<ScadaDbContext> optionsBuilder = new DbContextOptionsBuilder<ScadaDbContext>();
            optionsBuilder.UseSqlServer(connectionString)
                          .EnableSensitiveDataLogging(); ;

            return new ScadaDbContext(optionsBuilder.Options);
        }
        public void Restart()
        {
            Stop();
            Thread.Sleep(1500);
            Start();
        }

        private void LogActivatedAlarm(ActivatedAlarm aa)
        {
            string filePath = "alarmLog.txt"; // Change this to your desired file path

            string line = $"{aa.TimeStamp}|{aa.TargetAlarm.Tag.Name}|{aa.TargetAlarm.Type}{aa.TargetAlarm.Limit} PRIORITY: {aa.TargetAlarm.Priority}";
            

            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
               writer.WriteLine(line);
            }
        }
    }
}
