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
        List<ReportTagItemDTO> GetTagsForGivenInterval(ReportRequestStartEndTimeDTO dto);
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
            int priority = dto.Priority; // Assuming dto has a property called Priority

            var alarms = Context.ActivatedAlarms
                .Where(aa => aa.Alarm.Priority == (AlarmPriority)priority) // Assuming AlarmPriority is an enum
                .Include(aa => aa.Alarm)
                .ThenInclude(a => a.Tag)
                .Select(aa => new ReportAlarmItemForPriorityDTO
                {
                    Type = (int)aa.Alarm.Type,
                    Limit = aa.Alarm.Limit,
                    TagName = aa.Alarm.Tag != null ? aa.Alarm.Tag.Name : null,
                    Timestamp = aa.TimeStamp
                })
                .ToList();

            return alarms;
        }

        public List<ReportTagItemDTO> GetTagsForGivenInterval(ReportRequestStartEndTimeDTO dto)
        {
            DateTime startDate = dto.StartDateTime;
            DateTime endDate = dto.EndDateTime;

            var analogTags = Context.AnalogInputValues
                .Where(aiv => aiv.TimeStamp >= startDate && aiv.TimeStamp <= endDate)
                .Include(aiv => aiv.Tag)
                .Select(aiv => new ReportTagItemDTO
                {
                    Timestamp = aiv.TimeStamp,
                    Type = 0,
                    LowLimit = aiv.Tag.LowLimit,
                    HighLimit = aiv.Tag.HighLimit,
                    ScanTime = aiv.Tag.ScanTime,
                    Value = aiv.Value,
                    Name = aiv.Tag.Name,
                })
                .ToList();

            var digitalTags = Context.DigitalInputValues
                .Where(div => div.TimeStamp >= startDate && div.TimeStamp <= endDate)
                .Include(div => div.Tag)
                .Select(div => new ReportTagItemDTO
                {
                    Timestamp = div.TimeStamp,
                    Type = 1,
                    LowLimit = null,
                    HighLimit = null,
                    ScanTime = div.Tag.ScanTime,
                    Value = div.Value ? 1 : 0,
                    Name = div.Tag.Name
                })
                .ToList();

            var allTags = analogTags.Concat(digitalTags).ToList();

            return allTags;
        }




    }
}
