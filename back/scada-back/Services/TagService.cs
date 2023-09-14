using Microsoft.EntityFrameworkCore;
using scada_back.Context;
using scada_back.Models;
using scada_back.DTOs;
using System;
using System.Linq;
using AppContext = scada_back.Context.ScadaDbContext;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace scada_back.Services
{
    public interface ITagService
    {
        List<AnalogInput> GetAllAnalogInputs();
        AnalogInput AddAnalogInput(AnalogInputDTO dto);
        AnalogInput EditAnalogInput(AnalogInputDTO dto, int id);
        bool DeleteAnalogInput(int id);

        List<AnalogOutput> GetAllAnalogOutputs();
        AnalogOutput AddAnalogOutput(AnalogOutputDTO dto, DateTime now);
        AnalogOutput EditAnalogOutput(AnalogOutputDTO dto, int id);
        AnalogOutputValue EditAnalogOutputValue(AnalogValueDTO dto, int id);
        bool DeleteAnalogOutput(int id);
        AnalogOutputValue GetLastValueAO(AnalogOutput analogOutput);

        List<DigitalInput> GetAllDigitalInputs();
        DigitalInput AddDigitalInput(DigitalInputDTO dto);
        DigitalInput EditDigitalInput(DigitalInputDTO dto, int id);
        bool DeleteDigitalInput(int id);

        List<DigitalOutput> GetAllDigitalOutputs();
        DigitalOutput AddDigitalOutput(DigitalOutputDTO dto, DateTime now);
        DigitalOutput EditDigitalOutput(DigitalOutputDTO dto, int id);
        DigitalOutputValue EditDigitalOutputValue(DigitalValueDTO dto, int id);
        bool DeleteDigitalOutput(int id);
        DigitalOutputValue GetLastValueDO(DigitalOutput digitalOutput);
    }

    public class TagService : ITagService
    {
        public ScadaDbContext Context { get; set; }
        public TagService(ScadaDbContext scadaContext) { Context = scadaContext; }


        // ANALOG INPUT
        public List<AnalogInput> GetAllAnalogInputs()
        {
            List<AnalogInput> analogInputs = Context.AnalogInputs.Include(a => a.Address).ToList();
            return analogInputs;
        }

        public AnalogInput AddAnalogInput(AnalogInputDTO dto)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            AnalogInput newAI = new AnalogInput()
            {
                Name = dto.Name,
                Description = dto.Description,
                Address = address,
                ScanTime = dto.ScanTime,
                IsScanning = dto.IsScanning,
                LowLimit = dto.LowLimit,
                HighLimit = dto.HighLimit,
                Unit = dto.Unit,
            };
            //using (var context = new AppContext())
            //{
            Context.AnalogInputs.Add(newAI);
            Context.SaveChanges();
            return newAI;
        }

        public AnalogInput EditAnalogInput(AnalogInputDTO dto, int id)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            AnalogInput ai = Context.AnalogInputs.Include(a => a.Address).FirstOrDefault(p => p.Id == id);
            ai.Name = dto.Name;
            ai.Description = dto.Description;
            ai.Address = address;
            ai.ScanTime = dto.ScanTime;
            ai.IsScanning = dto.IsScanning;
            ai.LowLimit = dto.LowLimit;
            ai.HighLimit = dto.HighLimit;
            ai.Unit = dto.Unit;
            Context.AnalogInputs.Update(ai);
            Context.SaveChanges();
            return ai;
        }

        public bool DeleteAnalogInput(int id)
        {
            Console.WriteLine(id);
            AnalogInput ai = Context.AnalogInputs.First(x => x.Id == id);
            if (ai != null)
            {
                Context.AnalogInputs.Remove(ai);
                Context.SaveChanges();
                return true;
            }
            return false;   
        }

        // ANALOG OUTPUT
        public List<AnalogOutput> GetAllAnalogOutputs()
        {
            List<AnalogOutput> analogOutputs = Context.AnalogOutputs.Include(a => a.Address).ToList();
            return analogOutputs;
        }

        public AnalogOutput AddAnalogOutput(AnalogOutputDTO dto, DateTime now)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            AnalogOutput newAO = new AnalogOutput()
            {
                Name = dto.Name,
                Description = dto.Description,
                Address = address,
                InitialValue = dto.InitialValue,
                LowLimit = dto.LowLimit,
                HighLimit = dto.HighLimit,
                Unit = dto.Unit,
            };
            //using (var context = new AppContext())
            //{
            Context.AnalogOutputs.Add(newAO);
            Context.SaveChanges();
            Context.AnalogOutputValues.Add(new AnalogOutputValue()
            {
                Tag = newAO,
                TimeStamp = now,
                Value = dto.InitialValue
            });
            Context.SaveChanges();
            return newAO;
        }

        public AnalogOutput EditAnalogOutput(AnalogOutputDTO dto, int id)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            AnalogOutput ao = Context.AnalogOutputs.Include(a => a.Address).FirstOrDefault(p => p.Id == id);
            ao.Name = dto.Name;
            ao.Description = dto.Description;
            ao.Address = address;
            ao.InitialValue = dto.InitialValue;
            ao.LowLimit = dto.LowLimit;
            ao.HighLimit = dto.HighLimit;
            ao.Unit = dto.Unit;
            Context.AnalogOutputs.Update(ao);
            Context.SaveChanges();
            return ao;
        }

        public AnalogOutputValue EditAnalogOutputValue(AnalogValueDTO dto, int id)
        {
            AnalogOutputValue aov = new AnalogOutputValue()
            {
                Tag = Context.AnalogOutputs.FirstOrDefault(p => p.Id == id),
                Value = dto.Value,
                TimeStamp = DateTime.Now,
            };
            Context.AnalogOutputValues.Add(aov);
            Context.SaveChanges();
            return aov;
        }

        public bool DeleteAnalogOutput(int id)
        {
            Console.WriteLine(id);
            AnalogOutput ao = Context.AnalogOutputs.First(x => x.Id == id);
            if (ao != null)
            {
                Context.AnalogOutputs.Remove(ao);
                List<AnalogOutputValue> aovs = Context.AnalogOutputValues.Include(a => a.Tag)
                                                                    .Where(a => a.Tag != null && a.Tag.Id == id)
                                                                    .ToList();
                foreach(AnalogOutputValue v in aovs)
                {
                    Context.AnalogOutputValues.Remove(v);
                }
                Context.SaveChanges();
                return true;
            }
            return false;
        }

        public AnalogOutputValue GetLastValueAO(AnalogOutput analogOutput)
        {
            AnalogOutputValue lastValue = Context.AnalogOutputValues
                            .Include(a => a.Tag)
                            .Where(p => p.Tag.Id == analogOutput.Id)
                            .OrderBy(p => p.TimeStamp)
                            .LastOrDefault();

            return lastValue;
        }

        // DIGITAL INPUT
        public List<DigitalInput> GetAllDigitalInputs()
        {
            List<DigitalInput> digitalInput = Context.DigitalInputs.Include(a => a.Address).ToList();
            return digitalInput;
        }

        public DigitalInput AddDigitalInput(DigitalInputDTO dto)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            DigitalInput newDI = new DigitalInput()
            {
                Name = dto.Name,
                Description = dto.Description,
                Address = address,
                ScanTime = dto.ScanTime,
                IsScanning = dto.IsScanning
            };
            //using (var context = new AppContext())
            //{
            Context.DigitalInputs.Add(newDI);
            Context.SaveChanges();
            return newDI;
        }

        public DigitalInput EditDigitalInput(DigitalInputDTO dto, int id)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            DigitalInput di = Context.DigitalInputs.Include(a => a.Address).FirstOrDefault(p => p.Id == id);
            di.Name = dto.Name;
            di.Description = dto.Description;
            di.Address = address;
            di.ScanTime = dto.ScanTime;
            di.IsScanning = dto.IsScanning;
            Context.DigitalInputs.Update(di);
            Context.SaveChanges();
            return di;
        }

        public bool DeleteDigitalInput(int id)
        {
            Console.WriteLine(id);
            DigitalInput di = Context.DigitalInputs.First(x => x.Id == id);
            if (di != null)
            {
                Context.DigitalInputs.Remove(di);
                Context.SaveChanges();
                return true;
            }
            return false;
        }

        // DIGITAL OUTPUT
        public List<DigitalOutput> GetAllDigitalOutputs()
        {
            List<DigitalOutput> digitalOutputs = Context.DigitalOutputs.Include(a => a.Address).ToList();
            return digitalOutputs;
        }

        public DigitalOutputValue GetLastValueDO(DigitalOutput digitalOutput)
        {
            DigitalOutputValue lastValue = Context.DigitalOutputValues
                            .Include(a => a.Tag)
                            .Where(p => p.Tag.Id == digitalOutput.Id)
                            .OrderBy(p => p.TimeStamp)
                            .LastOrDefault();

            return lastValue;
        }

        public DigitalOutput AddDigitalOutput(DigitalOutputDTO dto, DateTime now)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            DigitalOutput newDO = new DigitalOutput()
            {
                Name = dto.Name,
                Description = dto.Description,
                Address = address,
                InitialValue = dto.InitialValue
            };
            //using (var context = new AppContext())
            //{
            Context.DigitalOutputs.Add(newDO);
            Context.SaveChanges();
            Context.DigitalOutputValues.Add(new DigitalOutputValue()
            {
                Tag = newDO,
                TimeStamp = now,
                Value = dto.InitialValue
            });
            Context.SaveChanges();
            return newDO;
        }

        public DigitalOutput EditDigitalOutput(DigitalOutputDTO dto, int id)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            DigitalOutput doo = Context.DigitalOutputs.Include(a => a.Address).FirstOrDefault(p => p.Id == id);
            doo.Name = dto.Name;
            doo.Description = dto.Description;
            doo.Address = address;
            doo.InitialValue = dto.InitialValue;
            Context.DigitalOutputs.Update(doo);
            Context.SaveChanges();
            return doo;
        }

        public DigitalOutputValue EditDigitalOutputValue(DigitalValueDTO dto, int id)
        {
            DigitalOutputValue aov = new DigitalOutputValue()
            {
                Tag = Context.DigitalOutputs.FirstOrDefault(p => p.Id == id),
                Value = dto.Value,
                TimeStamp = DateTime.Now,
            };
            Context.DigitalOutputValues.Add(aov);
            Context.SaveChanges();
            return aov;
        }

        public bool DeleteDigitalOutput(int id)
        {
            Console.WriteLine(id);
            DigitalOutput doo = Context.DigitalOutputs.First(x => x.Id == id);
            if (doo != null)
            {
                Context.DigitalOutputs.Remove(doo);
                List<DigitalOutputValue> aovs = Context.DigitalOutputValues.Include(a => a.Tag)
                                                                    .Where(a => a.Tag != null && a.Tag.Id == id)
                                                                    .ToList();
                foreach (DigitalOutputValue v in aovs)
                {
                    Context.DigitalOutputValues.Remove(v);
                }
                Context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
