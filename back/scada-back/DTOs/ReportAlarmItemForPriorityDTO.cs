namespace scada_back.DTOs
{
    public class ReportAlarmItemForPriorityDTO
    {

        public int Type { get; set; }
        public double Limit { get; set; }

        public string TagName { get; set; }
    }
}
