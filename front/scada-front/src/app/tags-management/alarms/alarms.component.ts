import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {

  selectedLegendItem!: string;
  selectedItemsLow: string[] = [];
  selectedItemsMedium: string[] = [];
  selectedItemsHigh: string[] = [];

  priority: string = "";
  priorities: string[] = ['Low', 'Medium', 'High'];
  type: string="";
  types: string [] = ['Above [High]', 'Below [Low]'];
  limit: number = 0;
  unit: string = 'C';
  name: string = '';

  alarmForm!: FormGroup;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      console.log(this.name);
      this.unit = params['unit'];
      console.log(this.unit);
    });
    // for (let i = -15; i < 30; i++) {
    //   this.selectedItemsLow.push(i.toString());
    // }

    // for (let i = 0; i < 60; i++) {
    //   this.selectedItemsMedium.push(i.toString());
    // }

    // for (let i = 61; i < 100; i++) {
    //   this.selectedItemsHigh.push(i.toString());
    // }

    this.alarmForm = new FormGroup({
      priority: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      limit: new FormControl('', Validators.required),
      btn: new FormControl("")
    });
  }

  selectItemInLegend(event:any){
    const clicked = event.target as HTMLDivElement;
    // this.lastSelectedLegendItem = this.selectedLegendItem;
    this.selectedLegendItem = clicked.innerText;
    console.log(this.selectedLegendItem);
    // this.updateCharts();
  }

  delete_alarm_low(item: string) {
    const index = this.selectedItemsLow.indexOf(item);
    if (index !== -1) {
      this.selectedItemsLow.splice(index, 1);
    }
  }

  delete_alarm_medium(item: string) {
    const index = this.selectedItemsMedium.indexOf(item);
    if (index !== -1) {
      this.selectedItemsMedium.splice(index, 1);
    }
  }

  delete_alarm_high(item: string) {
    const index = this.selectedItemsHigh.indexOf(item);
    if (index !== -1) {
      this.selectedItemsHigh.splice(index, 1);
    }
  }
  

  edit_tag(obj: any) {
    console.log('kris');
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
    if (priority == 'Low') {
      this.selectedItemsLow.push(sign + ' ' + limit + ' ' + this.unit);
    } else if (priority == 'Medium') {
      this.selectedItemsMedium.push(sign + ' ' + limit + ' ' + this.unit);
    } else {
      this.selectedItemsHigh.push(sign + ' ' + limit + ' ' + this.unit);
    }
    console.log(this.priority, this.type, this.limit);
  }

}
