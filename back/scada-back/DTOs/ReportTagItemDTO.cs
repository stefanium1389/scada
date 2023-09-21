namespace scada_back.DTOs
{
    public class ReportTagItemDTO
    {

        public DateTime Timestamp { get; set; }

        public int Type { get; set; }
        public double ?LowLimit { get; set; }
        public double ?HighLimit { get; set; }

        public double ScanTime { get; set; }

        public double Value { get; set; }

        public string Name { get; set; }
    }
}
