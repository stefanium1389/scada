using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using scada_back.Context;
using scada_back.Models;
using System;
using System.Net;
using System.Threading;

namespace scada_back.Services
{
    public interface IStartService
    {
        void Start();
        void Stop();
    }
    public class StartService: IStartService
    {
        private bool isRunning = true;
        public ScadaDbContext Context { get; set; }
        public IServiceProvider _serviceProvider { get; set; }
        public GlobalVariables GlobalVariables { get; set; }
        public Random random { get; set; } = new Random();

        public StartService(ScadaDbContext context, IServiceProvider serviceProvider) {  Context = context; GlobalVariables = GlobalVariables.Instance; _serviceProvider = serviceProvider; }

        public void Start() {
            isRunning = true;
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
        }

        private void DigitalReading(DigitalInput digital, CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();
            
                while (!cancellationToken.IsCancellationRequested)
                {
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
                    digitalVal.TimeStamp = new DateTime();
                    //lock (_lock)
                    {

                        dbContext.DigitalInputValues.Add(digitalVal);
                        dbContext.SaveChanges();
                    
                   
                    }
                    Thread.Sleep(digital.ScanTime);
                }
            }
        }

        private void AddressReading(Address address, CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();

                foreach(RealTimeUnit rtu in dbContext.RealTimeUnits.Include(a => a.Address))
                {
                    GlobalVariables.AddressRTU[rtu.Address.Id] = rtu.Id;
                }

                while (!cancellationToken.IsCancellationRequested)
                {
                    if (address.Driver == Driver.SIMULATION)
                        
                    {
                        if (address.Function == Function.SIN)
                        {
                            GlobalVariables.AddressValues[address.Id] = SimulationDriver.Sine();
                        }
                        if (address.Function == Function.COS)
                        {
                            GlobalVariables.AddressValues[address.Id] = SimulationDriver.Cosine();
                        }
                        if (address.Function == Function.RAMP)
                        {
                            GlobalVariables.AddressValues[address.Id] = SimulationDriver.Ramp();
                        }
                        Thread.Sleep((int)address.SimGenerateTime);
                    }

                
                    if (address.Driver == Driver.RTU)
                    {
                    
                        var rtuId = GlobalVariables.AddressRTU[address.Id];
                        var rtu = dbContext.RealTimeUnits.Find(rtuId);

                        double value = random.NextDouble() * (rtu.MaxValue - rtu.MinValue) + rtu.MaxValue;
                        GlobalVariables.AddressValues[address.Id] = value;
                        Thread.Sleep(rtu.GenerateTime);
                    }
                }
            }    
        }
        public void AnalogReading(AnalogInput analog, CancellationToken cancellationToken) {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();
                while (!cancellationToken.IsCancellationRequested)
                {
                    if (analog.IsScanning)
                    {
                        var analogValue = new AnalogInputValue();
                        analogValue.AnalogInputId = analog.Id;
                        analogValue.TimeStamp = new DateTime();
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
                        //lock (_lock)
                        {

                            dbContext.AnalogInputValues.Add(analogValue);
                            dbContext.SaveChanges();

                        }
                        foreach (Alarm alarm in analog.Alarms)
                        {
                            if (alarm.Type == AlarmType.LOW)
                            {
                                if (savedValue < alarm.Limit)
                                {
                                    ActivatedAlarm aa = new ActivatedAlarm();
                                    aa.Alarm = alarm;
                                    aa.TimeStamp = new DateTime();
                                    dbContext.ActivatedAlarms.Add(aa);
                                    dbContext.SaveChanges();

                                }
                            }
                            else if (alarm.Type == AlarmType.HIGH)
                            {
                                if (savedValue > alarm.Limit)
                                {
                                    ActivatedAlarm aa = new ActivatedAlarm();
                                    aa.Alarm = alarm;
                                    aa.TimeStamp = new DateTime();
                                    //lock (_lock)
                                    {
                                        dbContext.ActivatedAlarms.Add(aa);
                                        dbContext.SaveChanges();
                                    }
                                }
                            }
                        }
                    }

                    Thread.Sleep(analog.ScanTime);
                }
            }
        }
        public void Stop()
        {
            isRunning = false;
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
        }
        public void StopAddressThread(int addressId)
        {
            if (GlobalVariables.AddressCancellationToken.ContainsKey(addressId))
            {
                GlobalVariables.AddressCancellationToken[addressId].Cancel();
            }
        }
        public void StopAnalogThread(int analogId)
        {
            if (GlobalVariables.AnalogCancellationToken.ContainsKey(analogId))
            {
                GlobalVariables.AnalogCancellationToken[analogId].Cancel();
            }
        }
        public void StopDigitalThread(int digitalId)
        {
            if (GlobalVariables.DigitalCancellationToken.ContainsKey(digitalId))
            {
                GlobalVariables.DigitalCancellationToken[digitalId].Cancel();
            }
        }
        public void StartAddressThread(Address address)
        {
            var cancellationTokenSource = new CancellationTokenSource();
            var thread = new Thread(() =>
            {
                AddressReading(address, cancellationTokenSource.Token);
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
            var thread = new Thread(() =>
            {
                AnalogReading(analog, cancellationTokenSource.Token);
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
            var thread = new Thread(() =>
            {
                DigitalReading(digital, cancellationTokenSource.Token);
            }
                );
            thread.IsBackground = true;
            thread.Start();
            GlobalVariables.DigitalInputThread[digital.Id] = thread;
            GlobalVariables.DigitalCancellationToken[digital.Id] = cancellationTokenSource;
        }
    }
}
