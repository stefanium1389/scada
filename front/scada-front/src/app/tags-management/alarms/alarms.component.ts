import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlarmDTO, createAlarmDTO, AlarmIdDTO, createAlarmIdDTO } from 'src/app/DTOs/AlarmDTO';
import { AlarmService } from 'src/app/services/alarm.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {

  selectedLegendItem!: AlarmIdDTO;
  selectedItemsLow: AlarmIdDTO[] = [];
  selectedItemsMedium: AlarmIdDTO[] = [];
  selectedItemsHigh: AlarmIdDTO[] = [];

  priority: string = "";
  priorities: string[] = ['Low', 'Medium', 'High'];
  type: string="";
  types: string [] = ['Above [High]', 'Below [Low]'];
  limit: number = 0;
  unit: string = 'C';
  name: string = '';
  id: number = 0;

  alarmForm!: FormGroup;

  constructor(private route: ActivatedRoute, private alarmService: AlarmService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.name = params['name'];
      console.log(this.name);
      this.unit = params['unit'];
      console.log(this.unit);
    });

    this.alarmForm = new FormGroup({
      priority: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      limit: new FormControl('', Validators.required),
      btn: new FormControl("")
    });

    this.getAll();
  }

  getAll() {
    this.selectedItemsHigh.length = 0;
    this.selectedItemsMedium.length = 0;
    this.selectedItemsLow.length = 0;
    this.alarmService.getAllAlarmsForTag(this.id).subscribe({
      next: result => {
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
          // console.log(result[i].id);
          let elem = result[i];
          if (elem.priority == 'LOW') {
            this.selectedItemsLow.push(createAlarmIdDTO(elem.id, elem.type, elem.priority, elem.tagId, elem.limit));
          } else if (elem.priority == 'MEDIUM') {
            this.selectedItemsMedium.push(createAlarmIdDTO(elem.id, elem.type, elem.priority, elem.tagId, elem.limit));
          } else {
            this.selectedItemsHigh.push(createAlarmIdDTO(elem.id, elem.type, elem.priority, elem.tagId, elem.limit));
          }
        }

      },
      error: err => {
        console.log(err);
        // alert(err?.error?.message || JSON.stringify(err));
        alert('Failed to get alarms');
      }

    })
  }
  
  delete_alarm(item:AlarmIdDTO) {
    this.alarmService.deleteAlarm(item.Id).subscribe({
      next: result => {
        this.getAll();
      },
      error: err => {
        console.log(err);
        alert('Failed to delete alarm');
        // alert(err?.error?.message || JSON.stringify(err));
      }

    })
  }

  onSubmit() {
    let priority = this.alarmForm.get('priority')?.value;
    let type = this.alarmForm.get('type')?.value
    let limit = this.alarmForm.get('limit')?.value
    let sign = '';
    if (type == 'Above [High]') {
      sign = '>';
    } else {
      sign = '<';
    }

    let t = '';
    if (type == 'Above [High]') {
      t = 'LOW';
    } else {
      t = 'HIGH';
    }

    let p = '';
    if (priority == 'Low') {
      p = 'LOW';
    } else if (priority == 'Medium') {
      p = 'MEDIUM';
    } else {
      p = 'HIGH'
    }

    let dto = createAlarmDTO(t, p, this.id, limit);
    // console.log(dto);
    this.alarmService.addAlarm(dto).subscribe({
      next: result => {
        this.getAll();
      },
      error: err => {
        console.log(err);
        alert('Failed to add alarm');
        // alert(err?.error?.message || JSON.stringify(err));
      }

    })

  }

}
