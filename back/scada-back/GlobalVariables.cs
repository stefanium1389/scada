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
            AddressCancellationToken = new Dictionary<int, CancellationTokenSource>();
            AnalogInputThread = new Dictionary<int, Thread>();
            AnalogCancellationToken = new Dictionary<int, CancellationTokenSource>();
            DigitalInputThread = new Dictionary<int, Thread>();
            DigitalCancellationToken = new Dictionary<int, CancellationTokenSource>();
            TagCurrentActivatedAlarm = new Dictionary<int, ActivatedAlarm?>();
        }
        public Dictionary<int, double> AddressValues { get; }
        public Dictionary<int, int> AddressRTU { get; }
        public Dictionary<int, Thread> AddressThread {  get; }
        public Dictionary<int, CancellationTokenSource> AddressCancellationToken { get; }
        public Dictionary<int, Thread> AnalogInputThread { get; }
        public Dictionary<int, CancellationTokenSource> AnalogCancellationToken { get; }
        public Dictionary<int, Thread> DigitalInputThread { get; }
        public Dictionary<int, CancellationTokenSource> DigitalCancellationToken { get; }
        public Dictionary<int, ActivatedAlarm?> TagCurrentActivatedAlarm { get; }

    }
}
