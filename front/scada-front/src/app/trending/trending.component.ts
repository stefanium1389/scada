import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/tag.service';
import { TrendingService } from '../services/trending.service';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  constructor(private tagService: TagService, private trendingService: TrendingService, private SystemService: SystemService) { }
  analog_input_ids: number[] = [];
  digital_input_ids: number[] = [];
  analog_input: AnalogInputValue[] = [];
  digital_input: DigitalInputValue[] = [];


  ngOnInit(): void {
    this.restartSimulation();
    this.tagService.getAllAnalogInputs().subscribe({
      next: result => {
        for (const r of result.results) {
          this.analog_input_ids.push(r.id);
        }
        setInterval(() => {
          for(let id of this.analog_input_ids){
            this.trendingService.getCurrentAnalogInputById(id).subscribe({
              next: result => {
                console.log(result);
                  const analog_value = this.analog_input.find(obj => obj.analogId === id);
                  if(analog_value === undefined)
                  {
                    this.analog_input.push(result);
                  }
                  else
                  {
                    analog_value.title = result.title;
                    analog_value.value = result.value;
                    analog_value.unit = result.unit;
                    analog_value.timeStamp = result.timeStamp;
                    analog_value.priority = result.priority;
                    analog_value.triggeredAlarmLimit = result.triggeredAlarmLimit;
                    analog_value.triggeredAlarmType = result.triggeredAlarmType;
                  }                
              }
            })
          }
        }, 100);
      }
    })
    this.tagService.getAllDigitalInputs().subscribe({
      next: result => {
        for (const r of result.results) {
          this.digital_input_ids.push(r.id);
        }
        setInterval(() => {
          for(let id of this.digital_input_ids){
            this.trendingService.getCurrentDigitalInputById(id).subscribe({
              next: result => {
                console.log(result);
                  const digital_value = this.digital_input.find(obj => obj.digitalID === id);
                  if(digital_value === undefined)
                  {
                    this.digital_input.push(result);
                  }
                  else
                  {
                    digital_value.title = result.title;
                    digital_value.value = result.value;
                    digital_value.timeStamp = result.timeStamp
                  }                
              }
            })
          }
        }, 100);
 
      }
    })
    


    //this.analog_input = [{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"normal"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"low"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"high"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"69",unit:"C",priority:"critical"}]
    //this.digital_input = [{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"True"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"False"},{title:"title", timestamp:"28.08.2003. 16:54:53.245", value:"True"}]
  }
  restartSimulation(){
    this.SystemService.restartSystemSimulation().subscribe({
      next: result => {
        // alert(result.message);
        console.log(result.message);
      },
      error: err => {
        console.log(err);
        alert(err?.error?.message || JSON.stringify(err));
      }
    })
  }
}

export interface AnalogInputValue {
  analogId: number;
  title:string;
  timeStamp: Date;
  value: number;
  unit: string;
  priority: string;
  triggeredAlarmType: string;
  triggeredAlarmLimit: number;
}

export interface DigitalInputValue{
  digitalID: number;
  title:string;
  timeStamp:Date;
  value: boolean;
}