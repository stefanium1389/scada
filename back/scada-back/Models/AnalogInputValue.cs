﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace scada_back.Models
{
    [Table("AnalogInputValues")]
    public class AnalogInputValue
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("analog_input_id")]
        public int AnalogInputId { get; set; }

        [ForeignKey("AnalogInputId")]
        public AnalogInput Tag { get; set; }

        public DateTime TimeStamp { get; set; }

        public double Value { get; set; }
    }
}
