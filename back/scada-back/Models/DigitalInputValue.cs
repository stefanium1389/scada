using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("DigitalInputValues")]
    public class DigitalInputValue
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DigitalInput Tag { get; set; }

        public DateTime TimeStamp { get; set; }

        public bool Value { get; set; }
    }
}
