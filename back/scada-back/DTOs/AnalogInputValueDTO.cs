using scada_back.Models;

namespace scada_back.DTOs
{
    internal class AnalogInputValueDTO
    {
        public double Value { get; set; }
        public int TagID { get; set; }
        public DateTime Timestamp { get; set; }
        public AnalogInputValueDTO(AnalogInputValue x)
        {
            Value = x.Value;
            TagID = x.Tag.Id;
            Timestamp = x.TimeStamp;
        }
    }
}