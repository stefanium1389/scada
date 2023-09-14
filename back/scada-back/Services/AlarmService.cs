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
    public interface IAlarmService
    {
        List<Alarm> GetAllAlarmsForTag(int id);
        Alarm AddAlarm(AlarmDTO dto);
        bool DeleteAlarm(int id);
    }
    public class AlarmService : IAlarmService
    {
        public ScadaDbContext Context { get; set; }
        public AlarmService(ScadaDbContext scadaContext) { Context = scadaContext; }

        public List<Alarm> GetAllAlarmsForTag(int id)
        {
            List<Alarm> alarms = Context.Alarms
                .Include(a => a.Tag)
                .Where(a => a.Tag != null && a.Tag.Id == id)
                .ToList();
            return alarms;
        }
        public Alarm AddAlarm(AlarmDTO dto)
        {
            Enum.TryParse(dto.Priority, out AlarmPriority priority);
            Enum.TryParse(dto.Type, out AlarmType type);
            AnalogInput ai = Context.AnalogInputs.FirstOrDefault(p => p.Id == dto.TagId);
            if (dto.Limit > ai.HighLimit || dto.Limit < ai.LowLimit)
            {
                return null;
            }
            Alarm newAlarm = new Alarm()
            {
                Priority = priority,
                Type = type,
                Tag = ai,
                Limit = dto.Limit,
            };
            //using (var context = new AppContext())
            //{
            Context.Alarms.Add(newAlarm);
            Context.SaveChanges();
            return newAlarm;
        }
        public bool DeleteAlarm(int id)
        {
            Console.WriteLine(id);
            Alarm alarm = Context.Alarms.First(x => x.Id == id);
            if (alarm != null)
            {
                Context.Alarms.Remove(alarm);
                Context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
