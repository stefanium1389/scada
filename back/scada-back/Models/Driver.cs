using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    [Table("Drivers")]
    public class Driver
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}
