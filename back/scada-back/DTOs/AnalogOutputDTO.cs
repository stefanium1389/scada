namespace scada_back.DTOs
{
    public class AnalogOutputDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Address { get; set; }

        public double InitialValue { get; set; }

        public double LowLimit { get; set; }

        public double HighLimit { get; set; }

        public string Unit { get; set; }
    }
}
