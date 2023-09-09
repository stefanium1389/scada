using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("RealTimeUnits")]
    public class RealTimeUnit
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("address")]
        public string Address { get; set; }

        [Column("low_limit")]
        public double LowLimit { get; set; }

        [Column("high_limit")]
        public double HighLimit { get; set; }
    }
}
