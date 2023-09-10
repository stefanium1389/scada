using Microsoft.AspNetCore.Mvc;
using scada_back.DTO;
using scada_back.DTOs;
using scada_back.Models;
using scada_back.Services;
using System.Security.Claims;

namespace scada_back.Controllers
{
    [ApiController]
    [Route("api/alarm")]
    public class AlarmController : ControllerBase
    {
        public IAlarmService _alarmService { get; set; }

        public AlarmController(IAlarmService alarmService)
        {
            _alarmService = alarmService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<AlarmIdDTO>>> GetAllAlarms([FromRoute] int id)
        {
            List<AlarmIdDTO> alarmIdDTOs = new List<AlarmIdDTO>();
            List<Alarm> alarms = _alarmService.GetAllAlarmsForTag(id);
            foreach (var alarm in alarms)
            {
                alarmIdDTOs.Add(new AlarmIdDTO(alarm));
            }
            return Ok(alarmIdDTOs);
        }

        [HttpPost]
        public async Task<ActionResult<AlarmIdDTO>> AddAlarm([FromBody] AlarmDTO dto)
        {
            try
            {
                Alarm alarm = _alarmService.AddAlarm(dto);
                if (alarm != null)
                {
                    return Ok(new { alarm = new AlarmIdDTO(alarm) });
                }
                else
                {
                    return BadRequest(new { message = "Failed to add alarm" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<bool>> DeleteAlarm([FromRoute] int id)
        {
            try
            {
                bool successful = _alarmService.DeleteAlarm(id);
                if (successful)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "Failed to delete alarm" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
