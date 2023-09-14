using scada_back.Models;

namespace scada_back.DTOs
{
    public class DigitalOutputIdDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Address { get; set; }

        public double InitialValue { get; set; }

        public double CurrentValue { get; set; }

        public string LastChanged { get; set; }

        public DigitalOutputIdDTO(DigitalOutput doo, double currentValue, DateTime _lastChanged)
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
