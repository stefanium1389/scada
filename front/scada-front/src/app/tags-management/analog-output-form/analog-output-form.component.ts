import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-analog-output-form',
  templateUrl: './analog-output-form.component.html',
  styleUrls: ['./analog-output-form.component.css']
})
export class AnalogOutputFormComponent implements OnInit {

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = [];
  initial_value: number = 0;
  low_limit: string = ""
  high_limit: string = ""
  unit: string = ""
  analogOutputForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    this.analogOutputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      scan_time: new FormControl('', Validators.required),
      low_limit: new FormControl('', Validators.required),
      high_limit: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );
  }

  onSubmit() {
    this.name = this.analogOutputForm.get('name')?.value;
    this.description = this.analogOutputForm.get('description')?.value
    this.address = this.analogOutputForm.get('address')?.value
    this.initial_value = this.analogOutputForm.get('scan_time')?.value
    this.low_limit = this.analogOutputForm.get('low_limit')?.value
    this.high_limit = this.analogOutputForm.get('high_limit')?.value
    this.unit = this.analogOutputForm.get('unit')?.value
    console.log(this.name);
    console.log(this.description);
    console.log(this.address);
    console.log(this.initial_value);
    console.log(this.low_limit);
    console.log(this.high_limit);
    console.log(this.unit);
  }

}
