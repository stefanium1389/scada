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

  ngOnInit(): void {
    this.type = this.data.type;
    if (this.type == 'ao') {
      this.changeAnalogValueForm = new FormGroup({
        current_value: new FormControl(this.data.obj.currentValue, Validators.required),
        btn: new FormControl("")},
      );
    } else {
      this.changeDigitalValueForm = new FormGroup({
        current_value: new FormControl(this.data.obj.currentValue, Validators.required),
        btn: new FormControl("")},
      );
    }
  }

  onSubmit() {
    if (this.type == 'ao') {
      this.data.obj.currentValue = this.changeAnalogValueForm.get('current_value')?.value
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
