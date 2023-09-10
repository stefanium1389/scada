namespace scada_back.DTOs
{
    public class AlarmDTO
    {
        public string Type { get; set; }
        public string Priority { get; set; }
        public int? TagId { get; set; }
        public double Limit { get; set; }
    }
}
