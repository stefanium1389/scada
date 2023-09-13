using scada_back.Context;
using scada_back.DTOs;
using scada_back.Models;

namespace scada_back.Services
{
    public interface ISystemService
    {
        void AddAddresses();
    }
    public class SystemService : ISystemService
    {
        public ScadaDbContext Context { get; set; }
        public SystemService(ScadaDbContext scadaContext) { Context = scadaContext; }
        public void AddAddresses() {
            for (int i = 1; i <= 3; i++)
            {
                Address address = new Address()
                {
                    Name = "S" + i.ToString(),
                    Driver = Driver.SIMULATION,
                    Function = Function.SIN,
                    SimGenerateTime = 1000,
                };
                Context.Addresses.Add(address);
            }
            for (int i = 1; i <= 3; i++)
            {
                Address address = new Address()
                {
                    Name = "C" + i.ToString(),
                    Driver = Driver.SIMULATION,
                    Function = Function.COS,
                    SimGenerateTime = 1000,
                };
                Context.Addresses.Add(address);
            }
            for (int i = 1; i <= 3; i++)
            {
                Address address = new Address()
                {
                    Name = "R" + i.ToString(),
                    Driver = Driver.SIMULATION,
                    Function = Function.RAMP,
                    SimGenerateTime = 1000,
                };
                Context.Addresses.Add(address);
            }
            Context.SaveChanges();
        }
    }
}
