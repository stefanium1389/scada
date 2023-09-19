namespace scada_back.DTOs
{
    public class TrendingDigitalDTO
    {
        public int DigitalID { get; set; }  
        public string Title { get; set; }
        public DateTime TimeStamp { get; set; }
        public bool Value { get; set; }
    }
}
