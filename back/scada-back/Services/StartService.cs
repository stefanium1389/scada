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
        private object _lock = new object();
        private bool isRunning;
        public ScadaDbContext Context { get; set; }
        public IServiceProvider _serviceProvider { get; set; }
        public GlobalVariables GlobalVariables { get; set; }
        public Random random { get; set; } = new Random();

        public StartService(ScadaDbContext context, IServiceProvider serviceProvider) {  Context = context; GlobalVariables = GlobalVariables.Instance; _serviceProvider = serviceProvider; }

        public void Start() {
            isRunning = true;
            foreach (var address in Context.Addresses)
            {
                Console.WriteLine(address.Id);
                var thread = new Thread(() =>
                {
                    AddressReading(address);
                }
                );
                thread.IsBackground = true;
                thread.Start();
                GlobalVariables.AddressThread[address.Id] = thread;
            }
            foreach (var analog in Context.AnalogInputs.Include(a => a.Address).Include(a => a.Alarms))
            {
                var thread = new Thread(() =>
                {
                    AnalogReading(analog);
                }
                );
                thread.IsBackground = true;
                thread.Start();
                GlobalVariables.AnalogInputThread[analog.Id] = thread;


            }
            foreach (var digital in Context.DigitalInputs.Include(d => d.Address))
            {
                var thread = new Thread(() =>
                {
                    DigitalReading(digital);
                }
                );
                thread.IsBackground = true;
                thread.Start();
                GlobalVariables.DigitalInputThread[digital.Id] = thread;
            }
        }

        private void DigitalReading(DigitalInput digital)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();
            
                while (isRunning)
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
                    digitalVal.TimeStamp = DateTime.UtcNow;
                    //lock (_lock)
                    {

                        dbContext.DigitalInputValues.Add(digitalVal);
                        dbContext.SaveChanges();
                    
                   
                    }
                    Thread.Sleep(digital.ScanTime);
                }
            }
        }

        private void AddressReading(Address address)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();

                foreach(RealTimeUnit rtu in dbContext.RealTimeUnits.Include(a => a.Address))
                {
                    GlobalVariables.AddressRTU[rtu.Address.Id] = rtu.Id;
                }

                if (address.Driver == Driver.SIMULATION)
                {
                    while (isRunning)
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

                }
                if (address.Driver == Driver.RTU)
                {
                    while (isRunning)
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

        public void AnalogReading(AnalogInput analog) {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();
                while (isRunning)
                {
                    if (analog.IsScanning)
                    {
                        var analogValue = new AnalogInputValue();
                        analogValue.AnalogInputId = analog.Id;
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
                                    aa.TimeStamp = DateTime.Now;
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
                                    aa.TimeStamp = DateTime.Now;
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
            Console.WriteLine("ALOOOOO STOOOOOJ!!!!!");
            isRunning = false;
            Console.WriteLine(isRunning);
        }
    }
}
