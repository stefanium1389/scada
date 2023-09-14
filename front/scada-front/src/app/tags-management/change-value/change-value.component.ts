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

  changeValueForm!: FormGroup;
  getData: boolean = false;

  ngOnInit(): void {
    this.changeValueForm = new FormGroup({
      current_value: new FormControl(this.data.obj.currentValue, Validators.required),
      btn: new FormControl("")},
    );
  }

  onSubmit() {
    this.data.obj.currentValue = this.changeValueForm.get('current_value')?.value
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
