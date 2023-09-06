import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-digital-output-form',
  templateUrl: './digital-output-form.component.html',
  styleUrls: ['./digital-output-form.component.css']
})
export class DigitalOutputFormComponent implements OnInit {

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = [];
  initial_value: number = 0;
  digitalOutputForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    this.digitalOutputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      initial_value: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );
  }

  onSubmit() {
    this.name = this.digitalOutputForm.get('name')?.value;
    this.description = this.digitalOutputForm.get('description')?.value
    this.address = this.digitalOutputForm.get('address')?.value
    this.initial_value = this.digitalOutputForm.get('scan_time')?.value
    console.log(this.name);
    console.log(this.description);
    console.log(this.address);
    console.log(this.initial_value);
  }

}
