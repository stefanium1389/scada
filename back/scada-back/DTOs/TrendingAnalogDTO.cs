namespace scada_back.DTOs
{
    public class TrendingAnalogDTO
    {
        public int AnalogId { get; set; }
        public string Title {  get; set; }
        public DateTime TimeStamp { get; set; }
        public double Value {  get; set; }
        public string Unit { get; set; }
        public string Priority {  get; set; }
        public string TriggeredAlarmType {  get; set; }
        public double TriggeredAlarmLimit {  get; set; }
    }
}
