namespace scada_back.DTOs
{
    public class DigitalInputDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Function { get; set; }

        public string Address { get; set; }

        public int ScanTime { get; set; }

        public bool IsScanning { get; set; }
    }
}
