import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-digital-input-form',
  templateUrl: './digital-input-form.component.html',
  styleUrls: ['./digital-input-form.component.css']
})
export class DigitalInputFormComponent implements OnInit {

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = [];
  scan_time: number = 0;
  digitalInputForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    this.digitalInputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      scan_time: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );
  }

  onSubmit() {
    this.name = this.digitalInputForm.get('name')?.value;
    this.description = this.digitalInputForm.get('description')?.value
    this.address = this.digitalInputForm.get('address')?.value
    this.scan_time = this.digitalInputForm.get('scan_time')?.value
    console.log(this.name);
    console.log(this.description);
    console.log(this.address);
    console.log(this.scan_time);
  }

}
