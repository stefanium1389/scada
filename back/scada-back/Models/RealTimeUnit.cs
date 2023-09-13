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
        public Address Address { get; set; }

        [Column("min_value")]
        public double MinValue { get; set; }

        [Column("max_value")]
        public double MaxValue { get; set; }

        [Column("generate_time")]
        public int GenerateTime { get; set; }
    }
}
