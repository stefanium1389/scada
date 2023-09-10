namespace scada_back.DTOs
{
    public class DigitalOutputDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Address { get; set; }

        public double InitialValue { get; set; }
    }
}
