using Microsoft.EntityFrameworkCore;
using scada_back.Context;
using scada_back.Models;
using scada_back.DTOs;
using System;
using System.Linq;
using AppContext = scada_back.Context.ScadaDbContext;

namespace scada_back.Services
{
    public interface ITagService
    {
        List<AnalogInput> GetAllAnalogInputs();
        AnalogInput AddAnalogInput(AnalogInputDTO dto);
        AnalogInput EditAnalogInputs(AnalogInputDTO dto, int id);
        bool DeleteAnalogInput(int id);
    }

    public class TagService : ITagService
    {
        public ScadaDbContext Context { get; set; }
        public TagService(ScadaDbContext scadaContext) { Context = scadaContext; }


        public List<AnalogInput> GetAllAnalogInputs()
        {
            List<AnalogInput> analogInputs = Context.AnalogInputs.ToList();
            return analogInputs;
        }

        public AnalogInput AddAnalogInput(AnalogInputDTO dto)
        {
            Enum.TryParse(dto.Function, out Function function);
            AnalogInput newAI = new AnalogInput()
            {
                Name = dto.Name,
                Description = dto.Description,
                Function = function,
                Address = dto.Address,
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

        public AnalogInput EditAnalogInputs(AnalogInputDTO dto, int id)
        {
            AnalogInput ai = Context.AnalogInputs.FirstOrDefault(p => p.Id == id);
            ai.Name = dto.Name;
            ai.Description = dto.Description;
            Enum.TryParse(dto.Function, out Function function);
            ai.Function = function;
            ai.Address = dto.Address;
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
    }
}
