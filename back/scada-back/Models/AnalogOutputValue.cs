using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("AnalogOutputValues")]
    public class AnalogOutputValue
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public AnalogOutput Tag { get; set; }

        public DateTime TimeStamp { get; set; }

        public double Value { get; set; }
    }
}
