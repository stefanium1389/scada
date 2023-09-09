using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace scada_back.Models
{
    public enum AlarmType
    {
        LOW, HIGH
    }

    public enum AlarmPriority
    {
        LOW, MEDIUM, HIGH
    }

    [Table("Alarms")]
    public class Alarm
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("type")]
        public AlarmType Type { get; set; }

        [Column("priority")]
        public AlarmPriority Priority { get; set; }

        [Column("tag_id")]
        [JsonIgnore]
        public AnalogInput? TagId { get; set; }

        [Column("limit")]
        public double Limit { get; set; }
    }
}
