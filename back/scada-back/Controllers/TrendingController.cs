using Microsoft.AspNetCore.Mvc;
using scada_back.DTOs;
using scada_back.Models;
using scada_back.Services;

namespace scada_back.Controllers
{

    [ApiController]
    [Route("api/trending")]
    public class TrendingController : ControllerBase
    {
        public ITagService _tagService { get; set; }

        public TrendingController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        [Route("analogInputValue/{id}")]
        public async Task<ActionResult<List<AnalogInputIdDTO>>> GetAnalogInputValueById([FromRoute] int id)
        {
            try
            {
                AnalogInputValue analogInput = _tagService.GetAnalogInputValueById(id);
                return Ok(new AnalogInputValueDTO(analogInput));
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

    }
}
