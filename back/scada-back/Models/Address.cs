using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    public enum Driver
    {
        SIMULATION, RTU
    }

    public enum Function
    {
        SIN, COS, RAMP
    }

    [Table("Addresses")]
    public class Address
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("driver")]
        public Driver Driver { get; set; }

        [Column("function")]
        public Function? Function { get; set; }

        [Column("generate_time")]
        public int? SimGenerateTime { get; set; }

    }
}
