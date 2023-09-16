using Microsoft.EntityFrameworkCore;
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
        private GlobalVariables _globalVariables {  get; set; }
        public RTUService(ScadaDbContext scadaContext) { Context = scadaContext; _globalVariables = GlobalVariables.Instance; }

        public List<RealTimeUnit> GetAllRealTimeUnits()
        {
            List<RealTimeUnit> rtus = Context.RealTimeUnits.Include(a => a.Address).ToList();
            return rtus;
        }
        public RealTimeUnit AddRealTimeUnit(RTUDTO dto)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            if (address == null)
            {
                return null;
            }
            else
            {
                if (address.Driver == Driver.RTU)
                {
                    return null;
                }
            }
            address.Driver = Driver.RTU;
            Context.Addresses.Update(address);
            Context.SaveChanges();
            RealTimeUnit newTRU = new RealTimeUnit()
            {
               Address = address,
               MinValue = dto.MinValue,
               MaxValue = dto.MaxValue,
               GenerateTime = dto.GenerateTime,
            };
            Context.RealTimeUnits.Add(newTRU);
            Context.SaveChanges();
            _globalVariables.AddressRTU[address.Id] = newTRU.Id;
            return newTRU;
        }
        public RealTimeUnit EditRealTimeUnit(RTUDTO dto, int id)
        {
            Address address = Context.Addresses.FirstOrDefault(p => p.Name == dto.Address);
            RealTimeUnit rtu = Context.RealTimeUnits.Include(a => a.Address).FirstOrDefault(p => p.Id == id);
            if (address == null)
            {
                return null;
            }
            else
            {
                if (address.Driver == Driver.RTU && rtu.Address != address)
                {
                    return null;
                }
            }
            if (rtu.Address != address)
            {
                Address old = rtu.Address;
                old.Driver = Driver.SIMULATION;
                Context.Addresses.Update(old);
                _globalVariables.AddressRTU.Remove(old.Id);
            }
            address.Driver = Driver.RTU;
            Context.Addresses.Update(address);
            Context.SaveChanges();
            rtu.MinValue = dto.MinValue;
            rtu.MaxValue = dto.MaxValue;
            rtu.GenerateTime = dto.GenerateTime;
            rtu.Address = address;
            Context.RealTimeUnits.Update(rtu);
            Context.SaveChanges();
            _globalVariables.AddressRTU[address.Id] = rtu.Id;
            return rtu;
        }
        public bool DeleteRealTimeUnit(int id)
        {
            RealTimeUnit rtu = Context.RealTimeUnits.Include(a => a.Address).First(x => x.Id == id);
            Address address = rtu.Address;
            address.Driver = Driver.SIMULATION;
            Context.Addresses.Update(address);
            Context.SaveChanges();
            if (rtu != null)
            {
                Context.RealTimeUnits.Remove(rtu);
                Context.SaveChanges();
                _globalVariables.AddressRTU.Remove(address.Id);
                return true;
            }
            return false;

        }
    }
}
