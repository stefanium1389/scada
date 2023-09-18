using scada_back.Context;
using scada_back.DTOs;
using scada_back.Models;

namespace scada_back.Services
{ //Miodrag
    public interface ITrendingService
    {
        public TrendingAnalogDTO GetTrendingAnalog(int id);
        public TrendingDigitalDTO GetTrendingDigital(int id);
    }
    public class TrendingService : ITrendingService
    {
        public ScadaDbContext Context { get; set; }
        public GlobalVariables GlobalVariables { get; set; }

        public TrendingService(ScadaDbContext context) {  Context = context; GlobalVariables = GlobalVariables.Instance; }
        public TrendingAnalogDTO GetTrendingAnalog(int id)
        {
            var dto = new TrendingAnalogDTO();
            var analog = Context.AnalogInputs.FirstOrDefault(x => x.Id == id);
            if (analog == null)
            {
                throw new Exception();
            }
            dto.AnalogId = analog.Id;
            dto.Title = analog.Name;
            dto.Unit = analog.Unit;
            var analogValue = Context.AnalogInputValues.OrderBy(a => a.TimeStamp).LastOrDefault(a => analog.Id == a.Tag.Id);
            if(analogValue == null)
            {
                throw new Exception();
            }
            dto.Value = analogValue.Value;
            dto.TimeStamp = analogValue.TimeStamp;
            var lastAlarm = GlobalVariables.TagCurrentActivatedAlarm[analog.Id];
            if(lastAlarm != null)
            {
                dto.Priority = lastAlarm.TargetAlarm.Priority.ToString();
                dto.TriggeredAlarmLimit = lastAlarm.TargetAlarm.Limit;
                dto.TriggeredAlarmType = lastAlarm.TargetAlarm.Type.ToString();
            }
            return dto;            
        }

        public TrendingDigitalDTO GetTrendingDigital(int id)
        {
            var dto = new TrendingDigitalDTO();
            var digital = Context.DigitalInputs.FirstOrDefault(y => y.Id == id);
            if (digital == null)
            {
                throw new Exception();
            }
            dto.DigitalID = digital.Id;
            dto.Title = digital.Name;
            var digitalValue = Context.DigitalInputValues.OrderBy(a => a.TimeStamp).LastOrDefault(a => digital.Id == a.Tag.Id);
            if (digitalValue == null)
            {
                throw new Exception();
            }
            dto.Value = digitalValue.Value;
            dto.TimeStamp = digitalValue.TimeStamp;
            return dto;
        }
    }
}
