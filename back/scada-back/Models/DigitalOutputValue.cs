using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("DigitalOutputValues")]
    public class DigitalOutputValue
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DigitalOutput Tag { get; set; }

        public DateTime TimeStamp { get; set; }

        public bool Value { get; set; }
    }
}
