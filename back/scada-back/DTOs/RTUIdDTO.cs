using scada_back.Models;

namespace scada_back.DTOs
{
    public class RTUIdDTO
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public double LowLimit { get; set; }
        public double HighLimit { get; set; }

        public RTUIdDTO(RealTimeUnit rtu) { 
            Id = rtu.Id;
            Address = rtu.Address;
            LowLimit = rtu.LowLimit;
            HighLimit = rtu.HighLimit;
        }
    }
}
