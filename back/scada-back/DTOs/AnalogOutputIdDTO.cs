using scada_back.Models;

namespace scada_back.DTOs
{
    public class AnalogOutputIdDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Address { get; set; }

        public double InitialValue { get; set; }

        public double LowLimit { get; set; }

        public double HighLimit { get; set; }

        public string Unit { get; set; }

        public AnalogOutputIdDTO(AnalogOutput ao)
        {
            Id = ao.Id;
            Name = ao.Name;
            Description = ao.Description;
            Address = ao.Address.Name;
            InitialValue = ao.InitialValue;
            LowLimit = ao.LowLimit;
            HighLimit = ao.HighLimit;
            Unit = ao.Unit;
        }
    }
}
