using Microsoft.AspNetCore.Mvc;
using scada_back.DTO;
using scada_back.DTOs;
using scada_back.Models;
using scada_back.Services;
using System.Collections.Generic;
using System.Data;

namespace scada_back.Controllers
{
    [ApiController]
    [Route("api/reports")]
    public class ReportsController : ControllerBase
    {
        public IReportsService _reportsService { get; set; }

        public ReportsController(IReportsService reportsService)
        {
            _reportsService = reportsService;
        }

        [HttpPost]
        [Route("alarms/time")]
        public async Task<ActionResult<List<ReportAlarmItemDTO>>> getAlarmsByTime([FromBody] ReportRequestStartEndTimeDTO dto)
        {
            try
            {
                List < ReportAlarmItemDTO > reportAlarmItems = _reportsService.GetAlarmsForGivenInterval(dto);
                
                return Ok(new { results = reportAlarmItems });
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost]
        [Route("alarms/priority")]
        public async Task<ActionResult<List<ReportAlarmItemDTO>>> getAlarmsByPriority([FromBody] ReportRequestPriorityDTO dto)
        {
            try
            {
                List<ReportAlarmItemForPriorityDTO> reportAlarmItems = _reportsService.GetAlarmsForGivenPriority(dto);

                return Ok(new { results = reportAlarmItems });
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost]
        [Route("tags/time")]
        public async Task<ActionResult<List<ReportTagItemDTO>>> getTagsByPriority([FromBody] ReportRequestStartEndTimeDTO dto)
        {
            try
            {
                List<ReportTagItemDTO> items = _reportsService.GetTagsForGivenInterval(dto);

                return Ok(new { results = items });
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

    }

}