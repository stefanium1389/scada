using Microsoft.AspNetCore.Mvc;
using scada_back.DTOs;
using scada_back.Services;

namespace scada_back.Controllers
{
    [ApiController]
    [Route("api/system")]
    public class CoreController : Controller
    {
        public ISystemService _systemService { get; set; }
        public IStartService _startService { get; set; }

        public CoreController(ISystemService systemService, IStartService startService)
        {
            _systemService = systemService;
            _startService = startService;
        }

        [HttpGet]
        [Route("addresses")]
        public async void Addresses()
        {
            _systemService.AddAddresses();
        }
        [HttpGet]
        [Route("start")]
        public async Task<IActionResult> Start()
        {
            _startService.Start();
            return Ok(); 
        }

        [HttpGet]
        [Route("stop")]
        public async Task<IActionResult> Stop()
        {
            _startService.Stop();
            return Ok(); 
        }
        [HttpGet]
        [Route("restart")]
        public async Task<IActionResult> Restart()
        {
            _startService.Restart();
            return Ok();
        }
    }
}
