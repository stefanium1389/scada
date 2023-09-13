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

        public DigitalOutputIdDTO(DigitalOutput doo)
        {
            Id = doo.Id;
            Name = doo.Name;
            Description = doo.Description;
            Address = doo.Address.Name;
            InitialValue = doo.InitialValue;
        }
    }
}
