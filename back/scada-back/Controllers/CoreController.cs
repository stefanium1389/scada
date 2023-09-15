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
        public StartService StartService { get; set; }

        public CoreController(ISystemService systemService)
        {
            _systemService = systemService;
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
            StartService.Start();
        }
    }
}
