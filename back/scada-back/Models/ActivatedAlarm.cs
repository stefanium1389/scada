using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("ActivatedAlarms")]
    public class ActivatedAlarm
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public Alarm Alarm { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}
