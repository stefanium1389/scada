using Microsoft.EntityFrameworkCore;
using scada_back.Context;
using scada_back.DTOs;
using scada_back.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace scada_back.Services
{
    public interface IReportsService
    {
        List<ReportAlarmItemDTO> GetAlarmsForGivenInterval(ReportRequestStartEndTimeDTO dto);
        List<ReportAlarmItemForPriorityDTO> GetAlarmsForGivenPriority(ReportRequestPriorityDTO dto);
    }

    public class ReportsService : IReportsService
    {
        public ScadaDbContext Context { get; set; }

        public ReportsService(ScadaDbContext scadaContext)
        {
            Context = scadaContext;
        }

        public List<ReportAlarmItemDTO> GetAlarmsForGivenInterval(ReportRequestStartEndTimeDTO dto)
        {
            DateTime startDate = dto.StartDateTime;
            DateTime endDate = dto.EndDateTime;

            var alarms = Context.ActivatedAlarms
                .Where(aa => aa.TimeStamp >= startDate && aa.TimeStamp <= endDate)
                .Include(aa => aa.Alarm) 
                .ThenInclude(a => a.Tag)
                .Select(aa => new ReportAlarmItemDTO
                {
                    Priority = (int)aa.Alarm.Priority,
                    Timestamp = aa.TimeStamp,
                    Type = (int)aa.Alarm.Type,
                    Limit = aa.Alarm.Limit,
                    TagName = aa.Alarm.Tag != null ? aa.Alarm.Tag.Name : null
                })
                .ToList();

            return alarms;
        }

        public List<ReportAlarmItemForPriorityDTO> GetAlarmsForGivenPriority(ReportRequestPriorityDTO dto)
        {
            int priority = dto.Priority; 

            var alarms = Context.ActivatedAlarms
                .Where(aa => aa.Alarm.Priority == (AlarmPriority)priority)
                .Include(aa => aa.Alarm)
                .ThenInclude(a => a.Tag)
                .Select(aa => new ReportAlarmItemForPriorityDTO
                {
                    Type = (int)aa.Alarm.Type,
                    Limit = aa.Alarm.Limit,
                    TagName = aa.Alarm.Tag != null ? aa.Alarm.Tag.Name : null
                })
                .ToList();

            return alarms;
        }


    }
}
