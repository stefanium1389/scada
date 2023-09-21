import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  description: string= '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<DescriptionComponent>) { }

  ngOnInit(): void {
    this.description = this.data.obj;
  }

  firstFormGroup = this._formBuilder.group({
    // date: this.currentDate
  });

  ngOnDestroy(): void {
    this.matDialogRef.close();
  }

}
