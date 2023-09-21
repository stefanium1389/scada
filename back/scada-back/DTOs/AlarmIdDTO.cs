using scada_back.Models;

namespace scada_back.DTOs
{
    public class AlarmIdDTO
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Priority { get; set; }
        public int? TagId { get; set; }
        public double Limit { get; set; }

        public AlarmIdDTO(Alarm alarm) {
            Id = alarm.Id;
            Type = alarm.Type.ToString();
            Priority = alarm.Priority.ToString();
            TagId = alarm.Tag.Id;
            Limit = alarm.Limit;
        }
    }
}
