using scada_back.Models;

namespace scada_back.DTOs
{
    public class DigitalInputIdDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Function { get; set; }

        public string Address { get; set; }

        public int ScanTime { get; set; }

        public bool IsScanning { get; set; }

        public DigitalInputIdDTO(DigitalInput di)
        {
            Id = di.Id;
            Name = di.Name;
            Description = di.Description;
            Function = di.Function.ToString();
            Address = di.Address;
            ScanTime = di.ScanTime;
            IsScanning = di.IsScanning;
        }
    }
}
