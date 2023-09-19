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
        List<ReportTagItemDTO> GetLastValuesOfAnalogInputs();
        List<ReportTagItemDTO> GetLastValuesOfDigitalInputs();

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

            var analogInputTags = Context.AnalogInputValues
                .Where(aiv => aiv.TimeStamp >= startDate && aiv.TimeStamp <= endDate)
                .Include(aiv => aiv.Tag)
                .Select(aiv => new ReportTagItemDTO
                {
                    Timestamp = aiv.TimeStamp,
                    Type = 0, // Analog input
                    Value = aiv.Value,
                    Name = aiv.Tag.Name,
                })
                .ToList();

            var digitalInputTags = Context.DigitalInputValues
                .Where(div => div.TimeStamp >= startDate && div.TimeStamp <= endDate)
                .Include(div => div.Tag)
                .Select(div => new ReportTagItemDTO
                {
                    Timestamp = div.TimeStamp,
                    Type = 1, // Digital input
                    Value = div.Value ? 1 : 0,
                    Name = div.Tag.Name,
                })
                .ToList();

            var analogOutputTags = Context.AnalogOutputValues
                .Where(aov => aov.TimeStamp >= startDate && aov.TimeStamp <= endDate)
                .Include(aov => aov.Tag)
                .Select(aov => new ReportTagItemDTO
                {
                    Timestamp = aov.TimeStamp,
                    Type = 2, // Analog output
                    Value = aov.Value,
                    Name = aov.Tag.Name,
                })
                .ToList();

            var digitalOutputTags = Context.DigitalOutputValues
                .Where(dov => dov.TimeStamp >= startDate && dov.TimeStamp <= endDate)
                .Include(dov => dov.Tag)
                .Select(dov => new ReportTagItemDTO
                {
                    Timestamp = dov.TimeStamp,
                    Type = 3, // Digital output
                    Value = dov.Value ? 1 : 0,
                    Name = dov.Tag.Name,
                })
                .ToList();

            var allTags = analogInputTags
                .Concat(digitalInputTags)
                .Concat(analogOutputTags)
                .Concat(digitalOutputTags)
                .ToList();

            return allTags;
        }


        public List<ReportTagItemDTO> GetLastValuesOfAnalogInputs()
        {
            var lastValues = Context.AnalogInputValues
                .GroupBy(aiv => aiv.AnalogInputId)
                .Select(group => new
                {
                    AnalogInputId = group.Key,
                    LastTimestamp = group.Max(aiv => aiv.TimeStamp),
                })
                .ToList();

            var result = new List<ReportTagItemDTO>();

            foreach (var item in lastValues)
            {
                var lastValue = Context.AnalogInputValues
                    .Where(aiv => aiv.AnalogInputId == item.AnalogInputId && aiv.TimeStamp == item.LastTimestamp)
                    .Include(aiv => aiv.Tag) // Include the related Tag
                    .FirstOrDefault();

                if (lastValue != null)
                {
                    result.Add(new ReportTagItemDTO
                    {
                        Timestamp = lastValue.TimeStamp,
                        Type = 0, // Analog input
                        Value = lastValue.Value,
                        Name = lastValue.Tag.Name,
                    });
                }
            }

            return result;
        }


        public List<ReportTagItemDTO> GetLastValuesOfDigitalInputs()
        {
            var lastValues = Context.DigitalInputValues
                .GroupBy(div => div.DigitalInputId)
                .Select(group => new
                {
                    DigitalInputId = group.Key,
                    LastTimestamp = group.Max(div => div.TimeStamp),
                })
                .ToList();

            var result = new List<ReportTagItemDTO>();

            foreach (var item in lastValues)
            {
                var lastValue = Context.DigitalInputValues
                    .Where(div => div.DigitalInputId == item.DigitalInputId && div.TimeStamp == item.LastTimestamp)
                    .Include(div => div.Tag)
                    .FirstOrDefault();

                if (lastValue != null)
                {
                    result.Add(new ReportTagItemDTO
                    {
                        Timestamp = lastValue.TimeStamp,
                        Type = 1, // Digital input
                        Value = lastValue.Value ? 1 : 0,
                        Name = lastValue.Tag.Name,
                    });
                }
            }

            return result;
        }




    }
}
