using Microsoft.AspNetCore.Mvc;
using scada_back.DTO;
using scada_back.DTOs;
using scada_back.Models;
using scada_back.Services;

namespace scada_back.Controllers
{
    [ApiController]
    [Route("api/tag")]
    public class TagController : ControllerBase
    {
        public ITagService _tagService { get; set; }

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        [Route("analogInput")]
        public async Task<ActionResult<List<AnalogInputIdDTO>>> GetAllAnalogInputs()
        {
            List<AnalogInputIdDTO> analogInputIdDTOs = new List<AnalogInputIdDTO>();
            List<AnalogInput> analogInputs = _tagService.GetAllAnalogInputs();
            foreach (var analogInput in analogInputs)
            {
                analogInputIdDTOs.Add(new AnalogInputIdDTO(analogInput));
            }
            return Ok(new { results = analogInputIdDTOs });
        }

        [HttpPost]
        [Route("analogInput")]
        public async Task<ActionResult<AnalogInputIdDTO>> AddAnalogInput([FromBody] AnalogInputDTO dto)
        {
            try
            {
                AnalogInput ai = _tagService.AddAnalogInput(dto);
                if (ai != null)
                {
                    return Ok (new { ai = new AnalogInputIdDTO(ai)});
                }
                else
                {
                    return BadRequest(new { message = "Failed to add ai" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPut]
        [Route("analogInput/{id}")]
        public async Task<ActionResult<AnalogInputIdDTO>> EditAnalogInput([FromBody] AnalogInputDTO dto, [FromRoute] int id)
        {
            try
            {
                AnalogInput ai = _tagService.EditAnalogInputs(dto, id);
                if (ai != null)
                {
                    return Ok(new AnalogInputIdDTO(ai));
                }
                else
                {
                    return BadRequest(new { message = "Failed to add ai" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpDelete]
        [Route("analogInput/{id}")]
        public async Task<ActionResult<bool>> DeleteAnalogInput([FromRoute] int id)
        {
            try
            {
                bool successful = _tagService.DeleteAnalogInput(id);
                if (successful)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "Failed to delete ai" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }

 }
