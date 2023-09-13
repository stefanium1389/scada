using System.ComponentModel.DataAnnotations.Schema;
using System.Net;

namespace scada_back.Models
{

    //public enum Function
    //{
    //    SINUS, COSINUS, RAMP
    //}

    [Table("AnalogInputs")]
    public class AnalogInput
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

        [Column("low_limit")]
        public double LowLimit { get; set; }

        [Column("high_limit")]
        public double HighLimit { get; set; }

        [Column("unit")]
        public string Unit { get; set; }

        public ICollection<Alarm> Alarms { get; set; }


    }
}
