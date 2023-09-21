using scada_back.Models;

namespace scada_back.DTOs
{
    public class DigitalOutputIdDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Address { get; set; }

        public bool InitialValue { get; set; }

        public bool CurrentValue { get; set; }

        public string LastChanged { get; set; }

        public DigitalOutputIdDTO(DigitalOutput doo, bool currentValue, DateTime _lastChanged)
        {
            Id = doo.Id;
            Name = doo.Name;
            Description = doo.Description;
            Address = doo.Address.Name;
            InitialValue = doo.InitialValue;
            CurrentValue = currentValue;
            LastChanged = _lastChanged.ToString();
        }
    }
}
