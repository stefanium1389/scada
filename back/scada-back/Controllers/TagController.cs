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

        // ANALOG INPUT

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
                AnalogInput ai = _tagService.EditAnalogInput(dto, id);
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

        // ANALOG OUTPUT
        [HttpGet]
        [Route("analogOutput")]
        public async Task<ActionResult<List<AnalogOutputIdDTO>>> GetAllAnalogOutputs()
        {
            List<AnalogOutputIdDTO> analogOutputIdDTOs = new List<AnalogOutputIdDTO>();
            List<AnalogOutput> analogOutputs = _tagService.GetAllAnalogOutputs();
            foreach (var analogOutput in analogOutputs)
            {
                analogOutputIdDTOs.Add(new AnalogOutputIdDTO(analogOutput));
            }
            return Ok(new { results = analogOutputIdDTOs });
        }

        [HttpPost]
        [Route("analogOutput")]
        public async Task<ActionResult<AnalogOutputIdDTO>> AddAnalogOutput([FromBody] AnalogOutputDTO dto)
        {
            try
            {
                AnalogOutput ao = _tagService.AddAnalogOutput(dto);
                if (ao != null)
                {
                    return Ok(new { ao = new AnalogOutputIdDTO(ao) });
                }
                else
                {
                    return BadRequest(new { message = "Failed to add ao" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPut]
        [Route("analogOutput/{id}")]
        public async Task<ActionResult<AnalogOutputIdDTO>> EditAnalogOutput([FromBody] AnalogOutputDTO dto, [FromRoute] int id)
        {
            try
            {
                AnalogOutput ao = _tagService.EditAnalogOutput(dto, id);
                if (ao != null)
                {
                    return Ok(new AnalogOutputIdDTO(ao));
                }
                else
                {
                    return BadRequest(new { message = "Failed to edit ao" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpDelete]
        [Route("analogOutput/{id}")]
        public async Task<ActionResult<bool>> DeleteAnalogOutput([FromRoute] int id)
        {
            try
            {
                bool successful = _tagService.DeleteAnalogOutput(id);
                if (successful)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "Failed to delete ao" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // DIGITAL INPUT

        [HttpGet]
        [Route("digitalInput")]
        public async Task<ActionResult<List<DigitalInputIdDTO>>> GetAllDigitalInputs()
        {
            List<DigitalInputIdDTO> digitalInputtIdDTOs = new List<DigitalInputIdDTO>();
            List<DigitalInput> digitalInputs = _tagService.GetAllDigitalInputs();
            foreach (var digitalInput in digitalInputs)
            {
                digitalInputtIdDTOs.Add(new DigitalInputIdDTO(digitalInput));
            }
            return Ok(new { results = digitalInputtIdDTOs });
        }

        [HttpPost]
        [Route("digitalInput")]
        public async Task<ActionResult<DigitalInputIdDTO>> AddDigitalInput([FromBody] DigitalInputDTO dto)
        {
            try
            {
                DigitalInput di = _tagService.AddDigitalInput(dto);
                if (di != null)
                {
                    return Ok(new { di = new DigitalInputIdDTO(di) });
                }
                else
                {
                    return BadRequest(new { message = "Failed to add di" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPut]
        [Route("digitalInput/{id}")]
        public async Task<ActionResult<DigitalInputIdDTO>> EditDigitalInput([FromBody] DigitalInputDTO dto, [FromRoute] int id)
        {
            try
            {
                DigitalInput di = _tagService.EditDigitalInput(dto, id);
                if (di != null)
                {
                    return Ok(new DigitalInputIdDTO(di));
                }
                else
                {
                    return BadRequest(new { message = "Failed to edit di" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpDelete]
        [Route("digitalInput/{id}")]
        public async Task<ActionResult<bool>> DeleteDigitalInput([FromRoute] int id)
        {
            try
            {
                bool successful = _tagService.DeleteDigitalInput(id);
                if (successful)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "Failed to delete di" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // DIGITAL OUTPUT
        [HttpGet]
        [Route("digitalOutput")]
        public async Task<ActionResult<List<DigitalOutputIdDTO>>> GetAllDigitalOutputs()
        {
            List<DigitalOutputIdDTO> digitalOutputIdDTOs = new List<DigitalOutputIdDTO>();
            List<DigitalOutput> digitalOutputs = _tagService.GetAllDigitalOutputs();
            foreach (var digitalOutput in digitalOutputs)
            {
                digitalOutputIdDTOs.Add(new DigitalOutputIdDTO(digitalOutput));
            }
            return Ok(new { results = digitalOutputIdDTOs });
        }

        [HttpPost]
        [Route("digitalOutput")]
        public async Task<ActionResult<DigitalOutputIdDTO>> AddDigitalOutput([FromBody] DigitalOutputDTO dto)
        {
            try
            {
                DigitalOutput doo = _tagService.AddDigitalOutput(dto);
                if (doo != null)
                {
                    return Ok(new { doo = new DigitalOutputIdDTO(doo) });
                }
                else
                {
                    return BadRequest(new { message = "Failed to add do" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPut]
        [Route("digitalOutput/{id}")]
        public async Task<ActionResult<DigitalOutputIdDTO>> EditDigitalOutput([FromBody] DigitalOutputDTO dto, [FromRoute] int id)
        {
            try
            {
                DigitalOutput doo = _tagService.EditDigitalOutput(dto, id);
                if (doo != null)
                {
                    return Ok(new DigitalOutputIdDTO(doo));
                }
                else
                {
                    return BadRequest(new { message = "Failed to edit do" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpDelete]
        [Route("digitalOutput/{id}")]
        public async Task<ActionResult<bool>> DeleteDigitalOutput([FromRoute] int id)
        {
            try
            {
                bool successful = _tagService.DeleteDigitalOutput(id);
                if (successful)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "Failed to delete do" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }

 }
