using scada_back.Models;

namespace scada_back.DTOs
{
    public class RTUIdDTO
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public double MinValue { get; set; }
        public double MaxValue { get; set; }
        public int GenerateTime { get; set; }

        public RTUIdDTO(RealTimeUnit rtu) { 
            Id = rtu.Id;
            Address = rtu.Address.Name;
            MinValue = rtu.MinValue;
            MaxValue = rtu.MaxValue;
            GenerateTime = rtu.GenerateTime;
        }
    }
}
