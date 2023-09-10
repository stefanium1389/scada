using scada_back.Models;

namespace scada_back.DTOs
{
    public class AnalogInputIdDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Function { get; set; }

        public string Address { get; set; }

        public int ScanTime { get; set; }

        public bool IsScanning { get; set; }

        public double LowLimit { get; set; }

        public double HighLimit { get; set; }

        public string Unit { get; set; }

        public AnalogInputIdDTO(AnalogInput ai)
        {
            Id = ai.Id;
            Name = ai.Name;
            Description = ai.Description;
            Function = ai.Function.ToString();
            Address = ai.Address;
            ScanTime = ai.ScanTime;
            IsScanning = ai.IsScanning;
            LowLimit = ai.LowLimit;
            HighLimit = ai.HighLimit;
            Unit = ai.Unit;
        }
    }
}
