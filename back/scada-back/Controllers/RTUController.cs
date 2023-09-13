using Microsoft.AspNetCore.Mvc;
using scada_back.DTOs;
using scada_back.Models;
using scada_back.Services;

namespace scada_back.Controllers
{
    [ApiController]
    [Route("api/rtu")]
    public class RTUController : ControllerBase
    {
        public IRTUService _rtuService { get; set; }

        public RTUController(IRTUService rtuService)
        {
            _rtuService = rtuService;
        }

        // ANALOG INPUT

        [HttpGet]
        public async Task<ActionResult<List<RTUIdDTO>>> GetAllRealTimeUnits()
        {
            List<RTUIdDTO> RealTimeUnitIdDTOs = new List<RTUIdDTO>();
            List<RealTimeUnit> rtus = _rtuService.GetAllRealTimeUnits();
            foreach (var rtu in rtus)
            {
                RealTimeUnitIdDTOs.Add(new RTUIdDTO(rtu));
            }
            return Ok(new { results = RealTimeUnitIdDTOs });
        }

        [HttpPost]
        public async Task<ActionResult<RTUIdDTO>> AddRealTimeUnit([FromBody] RTUDTO dto)
        {
            try
            {
                RealTimeUnit rtu = _rtuService.AddRealTimeUnit(dto);
                if (rtu != null)
                {
                    return Ok(new { rtu = new RTUIdDTO(rtu) });
                }
                else
                {
                    return BadRequest(new { message = "Failed to add rtu" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<RTUIdDTO>> EditRealTimeUnit([FromBody] RTUDTO dto, [FromRoute] int id)
        {
            try
            {
                RealTimeUnit rtu = _rtuService.EditRealTimeUnit(dto, id);
                if (rtu != null)
                {
                    return Ok(new RTUIdDTO(rtu));
                }
                else
                {
                    return BadRequest(new { message = "Failed to add rtu" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<bool>> DeleteRealTimeUnit([FromRoute] int id)
        {
            try
            {
                bool successful = _rtuService.DeleteRealTimeUnit(id);
                if (successful)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "Failed to delete rtu" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
