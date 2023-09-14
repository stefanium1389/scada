import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-value',
  templateUrl: './change-value.component.html',
  styleUrls: ['./change-value.component.css']
})
export class ChangeValueComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<ChangeValueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  changeAnalogValueForm!: FormGroup;
  changeDigitalValueForm!: FormGroup;
  getData: boolean = false;
  type: string = '';
  current_values: string[] = ['On', 'Off'];
  low_limit!: number;
  high_limit!: number;

  ngOnInit(): void {
    this.type = this.data.type;
    if (this.type == 'ao') {
      this.changeAnalogValueForm = new FormGroup({
        current_value: new FormControl(this.data.obj.currentValue, Validators.required),
        btn: new FormControl("")},
      );
    } else {
      console.log(this.data.obj.currentValue)
      let current_value = 'On';
      if (this.data.obj.currentValue) {
        current_value = 'On';
      } else {
        current_value = 'Off';
      }
      this.changeDigitalValueForm = new FormGroup({
        current_value: new FormControl(current_value, Validators.required),
        btn: new FormControl("")},
      );
    }
    this.low_limit = this.data.obj.lowLimit;
    this.high_limit = this.data.obj.highLimit;
  }

  onSubmit() {
    if (this.type == 'ao') {
      let m = this.changeAnalogValueForm.get('current_value')?.value;
      if (m < this.low_limit || m > this.low_limit) {
        alert ('Value not in range [' + this.low_limit + " , " + this.high_limit + "]!");
      } else {
        this.data.obj.currentValue = this.changeAnalogValueForm.get('current_value')?.value
      }
    } else {
      this.data.obj.currentValue = this.changeDigitalValueForm.get('current_value')?.value
    }
    this.onClose();
  }

  ngOnDestroy(): void {
    if (this.getData) {
      this.matDialogRef.close(this.data);
    } else {
      this.matDialogRef.close();
    }
    this.getData = false;
  }

  onClose() {
    this.getData=true;
    // this.data.date = this.firstFormGroup.value.date;
    this.matDialogRef.close(this.data);
  }

}
