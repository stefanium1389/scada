using scada_back.Context;
using scada_back.Models;

namespace scada_back.Services
{
    public class StartService
    {
        public ScadaDbContext Context { get; set; }
        public GlobalVariables GlobalVariables { get; set; }
        public Random random { get; set; } = new Random();

        public StartService(ScadaDbContext context) {  Context = context; GlobalVariables = GlobalVariables.getInstance(); }

        public void Start() {
            foreach(var analog in Context.AnalogInputs)
            {
                new Thread(() => 
                {
                    AnalogReading(analog);
                }
                ).Start();
            }
            foreach(var digital in Context.DigitalInputs)
            {
                new Thread(() => 
                {
                    DigitalReading(digital);
                }
                ).Start();
            }

            foreach(var address in Context.Addresses)
            {
                new Thread(() => 
                {
                    AddressReading(address);
                }
                ).Start();
            }

        }

        private void DigitalReading(DigitalInput digital)
        {
            while(true)
            {
                var realValue = GlobalVariables.AddressValues[digital.Address.Id];
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
                digitalVal.Tag = digital;
                digitalVal.TimeStamp = DateTime.UtcNow;
                Context.DigitalInputValues.Add(digitalVal);
                Context.SaveChanges();
                Thread.Sleep(digital.ScanTime);
            }
        }

        private void AddressReading(Address address)
        {
            if (address.Driver == Driver.SIMULATION)
            {
                while (true)
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
                while (true)
                {
                    var rtuId = GlobalVariables.AddressRTU[address.Id];
                    var rtu = Context.RealTimeUnits.Find(rtuId);

                    double value = random.NextDouble() * (rtu.MaxValue - rtu.MinValue) + rtu.MaxValue;
                    GlobalVariables.AddressValues[address.Id] = value;
                    Thread.Sleep(rtu.GenerateTime);
                }
                
            }
        }

        public void AnalogReading(AnalogInput analog) {
            while (true)
            {
                if (analog.IsScanning)
                {
                    var analogValue = new AnalogInputValue();
                    analogValue.Tag = analog;
                    var realValue = GlobalVariables.AddressValues[analog.Address.Id];
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
                    Context.AnalogInputValues.Add(analogValue);
                    foreach(var alarm in analog.Alarms)
                    {
                        if(alarm.Type == AlarmType.LOW)
                        {
                            if(savedValue < alarm.Limit)
                            {
                                ActivatedAlarm aa = new ActivatedAlarm();
                                aa.Alarm = alarm;
                                aa.TimeStamp = DateTime.Now;
                                Context.ActivatedAlarms.Add(aa);
                            }
                        }
                        else if (alarm.Type == AlarmType.HIGH)
                        {
                            if (savedValue > alarm.Limit)
                            {
                                ActivatedAlarm aa = new ActivatedAlarm();
                                aa.Alarm = alarm;
                                aa.TimeStamp = DateTime.Now;
                                Context.ActivatedAlarms.Add(aa);
                            }
                        }
                    }
                }
                Context.SaveChanges();
                Thread.Sleep(analog.ScanTime);
            }
            
        }
    }
}
