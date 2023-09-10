using Microsoft.EntityFrameworkCore.Metadata.Internal;
using scada_back.Context;
using scada_back.DTOs;
using scada_back.Models;

namespace scada_back.Services
{
    public interface IRTUService
    {
        List<RealTimeUnit> GetAllRealTimeUnits();
        RealTimeUnit AddRealTimeUnit(RTUDTO dto);
        RealTimeUnit EditRealTimeUnit(RTUDTO dto, int id);
        bool DeleteRealTimeUnit(int id);
    }
    public class RTUService : IRTUService
    {
        public ScadaDbContext Context { get; set; }
        public RTUService(ScadaDbContext scadaContext) { Context = scadaContext; }

        public List<RealTimeUnit> GetAllRealTimeUnits()
        {
            List<RealTimeUnit> rtus = Context.RealTimeUnits.ToList();
            return rtus;
        }
        public RealTimeUnit AddRealTimeUnit(RTUDTO dto)
        {
            RealTimeUnit newTRU = new RealTimeUnit()
            {
               Address = dto.Address,
               LowLimit = dto.LowLimit,
               HighLimit = dto.HighLimit,
            };
            Context.RealTimeUnits.Add(newTRU);
            Context.SaveChanges();
            return newTRU;
        }
        public RealTimeUnit EditRealTimeUnit(RTUDTO dto, int id)
        {
            RealTimeUnit rtu = Context.RealTimeUnits.FirstOrDefault(p => p.Id == id);
            rtu.Address = dto.Address;
            rtu.LowLimit = dto.LowLimit;
            rtu.HighLimit = dto.HighLimit;
            Context.RealTimeUnits.Update(rtu);
            Context.SaveChanges();
            return rtu;
        }
        public bool DeleteRealTimeUnit(int id)
        {
            RealTimeUnit rtu = Context.RealTimeUnits.First(x => x.Id == id);
            if (rtu != null)
            {
                Context.RealTimeUnits.Remove(rtu);
                Context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
