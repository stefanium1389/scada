using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("AnalogOutputs")]
    public class AnalogOutput
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("address")]
        public string Address { get; set; }

        [Column("initial_value")]
        public double InitialValue { get; set; }

        [Column("low_limit")]
        public double LowLimit { get; set; }

        [Column("high_limit")]
        public double HighLimit { get; set; }

        [Column("unit")]
        public string Unit { get; set; }
    }
}
