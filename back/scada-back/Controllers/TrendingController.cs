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
        public ITrendingService _trendingService { get; set; }

        public TrendingController(ITrendingService trendingService)
        {
            _trendingService = trendingService;
        }

        [HttpGet]
        [Route("analogInput/{id}")]
        public async Task<ActionResult<TrendingAnalogDTO>> GetAnalogInputValueById([FromRoute] int id)
        {
            try
            {
                return Ok(_trendingService.GetTrendingAnalog(id));
            }
            catch(Exception ex) 
            {
                return StatusCode(404, ex.Message);
            }
        }

        [HttpGet]
        [Route("digitalInput/{id}")]
        public async Task<ActionResult<TrendingDigitalDTO>> GetDigitalInputValueById([FromRoute] int id)
        {
            try
            {
                return Ok(_trendingService.GetTrendingDigital(id));
            }
            catch (Exception ex)
            {
                return StatusCode(404, ex.Message);
            }
        }

    }
}
