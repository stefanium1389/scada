import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-analog-input-form',
  templateUrl: './analog-input-form.component.html',
  styleUrls: ['./analog-input-form.component.css']
})
export class AnalogInputFormComponent implements OnInit {

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = [];
  function: string="";
  functions: string [] = ["Sinus","Cosinus", "Ramp"];
  scan_time: number = 0;
  low_limit: string = ""
  high_limit: string = ""
  unit: string = ""
  analogInputForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    this.analogInputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      function: new FormControl('', Validators.required),
      scan_time: new FormControl('', Validators.required),
      low_limit: new FormControl('', Validators.required),
      high_limit: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );
  }

  onSubmit() {
    this.name = this.analogInputForm.get('name')?.value;
    this.description = this.analogInputForm.get('description')?.value
    this.address = this.analogInputForm.get('address')?.value
    this.function = this.analogInputForm.get('function')?.value
    this.scan_time = this.analogInputForm.get('scan_time')?.value
    this.low_limit = this.analogInputForm.get('low_limit')?.value
    this.high_limit = this.analogInputForm.get('high_limit')?.value
    this.unit = this.analogInputForm.get('unit')?.value
    console.log(this.name);
    console.log(this.description);
    console.log(this.address);
    console.log(this.function);
    console.log(this.scan_time);
    console.log(this.low_limit);
    console.log(this.high_limit);
    console.log(this.unit);
  }

}
