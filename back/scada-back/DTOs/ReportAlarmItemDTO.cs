namespace scada_back.DTOs
{
    public class ReportAlarmItemDTO
    {
        public int Priority { get; set; }

        public DateTime Timestamp { get; set; }

        public int Type { get; set; }
        public double Limit { get; set; }

        public string TagName { get; set; }
    }
}
