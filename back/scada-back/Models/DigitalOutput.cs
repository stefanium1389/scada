using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("DigitalOutputs")]
    public class DigitalOutput
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string Description { get; set; }

        //[Column("address")]
        //public string Address { get; set; }

        [Column("address")]
        public Address Address { get; set; }

        [Column("initial_value")]
        public bool InitialValue { get; set; }
    }
}
