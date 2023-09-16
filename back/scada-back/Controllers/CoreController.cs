using Microsoft.AspNetCore.Mvc;
using scada_back.DTOs;
using scada_back.Services;

namespace scada_back.Controllers
{
    [ApiController]
    [Route("api/system")]
    public class CoreController
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
        public async void Start()
        {
            _startService.Start();
        }
        [HttpGet]
        [Route("stop")]
        public async void Stop()
        {
            _startService.Stop();
        }
    }
}
