using System.ComponentModel;

namespace scada_back
{
    public class GlobalVariables
    {
        public static GlobalVariables instance {  get; set; }
        public static GlobalVariables getInstance()
        {
            if(instance != null)
            {
                return instance;
            }
            else instance = new GlobalVariables();
            return instance;
        }
        private GlobalVariables() {
            AddressValues = new Dictionary<int, double>();
            AddressRTU = new Dictionary<int, int>();
        }
        public Dictionary<int,double> AddressValues { get; }
        public Dictionary<int, int> AddressRTU { get; } 
    }
}
