using scada_back.Models;
using System.ComponentModel;

namespace scada_back
{
    public class GlobalVariables
    {
        private static readonly Lazy<GlobalVariables> lazyInstance =
            new Lazy<GlobalVariables>(() => new GlobalVariables());

        public static GlobalVariables Instance => lazyInstance.Value;

    private GlobalVariables() {
            AddressValues = new Dictionary<int, double>();
            AddressRTU = new Dictionary<int, int>();
            AddressThread = new Dictionary<int, Thread>();
            AnalogInputThread = new Dictionary<int, Thread>();
            DigitalInputThread = new Dictionary<int, Thread>();
            TagCurrentActivatedAlarm = new Dictionary<int, ActivatedAlarm?>();
        }
        public Dictionary<int, double> AddressValues { get; }
        public Dictionary<int, int> AddressRTU { get; }
        public Dictionary<int, Thread> AddressThread {  get; }
        public Dictionary<int, Thread> AnalogInputThread { get; }
        public Dictionary<int, Thread> DigitalInputThread { get; }
        public Dictionary<int, ActivatedAlarm?> TagCurrentActivatedAlarm { get; }

    }
}
