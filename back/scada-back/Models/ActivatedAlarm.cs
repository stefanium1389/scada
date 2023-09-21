using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("ActivatedAlarms")]
    public class ActivatedAlarm
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("alarm_id")]
        public int AlarmId { get; set; }

        [ForeignKey("AlarmId")]
        public Alarm TargetAlarm { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}
