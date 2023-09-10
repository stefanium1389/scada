using scada_back.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.DTOs
{
    public class AnalogInputDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Function { get; set; }

        public string Address { get; set; }

        public int ScanTime { get; set; }

        public bool IsScanning { get; set; }

        public double LowLimit { get; set; }

        public double HighLimit { get; set; }

        public string Unit { get; set; }
    }
}
