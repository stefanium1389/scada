using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{

    [Table("DigitalInputs")]
    public class DigitalInput
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string Description { get; set; }

        //[Column("driver")]
        //public int DriverId { get; set; }

        //[Column("function")]
        //public Function Function { get; set; }

        //[Column("address")]
        //public string Address { get; set; }

        [Column("address")]
        public Address Address { get; set; }

        [Column("scan_time")]
        public int ScanTime { get; set; }

        [Column("is_scanning")]
        public bool IsScanning { get; set; }
    }
}
