import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = [];
  function: string="";
  functions: string [] = ["Sinus","Cosinus", "Ramp"];
  scan_time: number = 0;
  initial_value: number = 0;
  initial_value_form: number = 0;
  low_limit: string = ""
  high_limit: string = ""
  unit: string = ""


  type: string ="";
  EditAnalogInputForm!: FormGroup;
  EditAnalogOutputForm!: FormGroup;
  EditDigitalInputForm!: FormGroup;
  EditDigitalOutputForm!: FormGroup;


  getData: boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<EditComponent>) {
  }

  firstFormGroup = this._formBuilder.group({
    // date: this.currentDate
  });

  ngOnInit(): void {
    // console.log(this.data);
    this.type = this.data.type;
    // console.log(this.type);
    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    if (this.type == 'ai') {
      this.EditAnalogInputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
        function: new FormControl(this.data.obj.function, Validators.required),
        scan_time: new FormControl(this.data.obj.scan_time, Validators.required), // Set a default numeric value here
        low_limit: new FormControl(this.data.obj.low, Validators.required), // Set a default numeric value here
        high_limit: new FormControl(this.data.obj.high, Validators.required), // Set a default numeric value here
        unit: new FormControl(this.data.obj.unit, Validators.required),
        btn: new FormControl("")
      });
    } else if (this.type == 'di') {
      this.EditDigitalInputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
        scan_time: new FormControl(this.data.obj.scan_time, Validators.required),
        btn: new FormControl("")},
      );
    } else if (this.type == 'ao') {
      this.initial_value_form = this.data.obj.initial_value;
      this.EditAnalogOutputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
        //initial_value: new FormControl(this.data.obj.initial_value, Validators.required),
        low_limit: new FormControl(this.data.obj.low, Validators.required),
        high_limit: new FormControl(this.data.obj.high, Validators.required),
        unit: new FormControl(this.data.obj.unit, Validators.required),
        btn: new FormControl("")},
      );
    } else { //do
      this.initial_value_form = this.data.obj.initial_value;
      this.EditDigitalOutputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
        // initial_value: new FormControl('', Validators.required),
        btn: new FormControl("")},
      );
    }
   }

  onSubmit() {
    if (this.type == 'ai') {
      this.data.obj.name = this.EditAnalogInputForm.get('name')?.value;
      this.data.obj.description = this.EditAnalogInputForm.get('description')?.value
      this.data.obj.address = this.EditAnalogInputForm.get('address')?.value
      this.data.obj.function = this.EditAnalogInputForm.get('function')?.value
      this.data.obj.scan_time = this.EditAnalogInputForm.get('scan_time')?.value
      this.data.obj.low = this.EditAnalogInputForm.get('low_limit')?.value
      this.data.obj.high = this.EditAnalogInputForm.get('high_limit')?.value
      this.data.obj.unit = this.EditAnalogInputForm.get('unit')?.value
    } else if (this.type == 'di') {
      this.data.obj.name = this.EditDigitalInputForm.get('name')?.value;
      this.data.obj.description = this.EditDigitalInputForm.get('description')?.value
      this.data.obj.address = this.EditDigitalInputForm.get('address')?.value
      this.data.obj.scan_time = this.EditDigitalInputForm.get('scan_time')?.value
    } else if (this.type == 'ao') {
      this.data.obj.name = this.EditAnalogOutputForm.get('name')?.value;
      this.data.obj.description = this.EditAnalogOutputForm.get('description')?.value
      this.data.obj.address = this.EditAnalogOutputForm.get('address')?.value
      this.data.obj.initial_value = this.initial_value_form;
      this.data.obj.low = this.EditAnalogOutputForm.get('low_limit')?.value
      this.data.obj.high = this.EditAnalogOutputForm.get('high_limit')?.value
      this.data.obj.unit = this.EditAnalogOutputForm.get('unit')?.value
    } else { //do
      this.data.obj.name = this.EditDigitalOutputForm.get('name')?.value;
      this.data.obj.description = this.EditDigitalOutputForm.get('description')?.value
      this.data.obj.address = this.EditDigitalOutputForm.get('address')?.value
      this.data.obj.initial_value = this.initial_value_form;
    }


    this.onClose();
    // console.log(this.name);
    // console.log(this.description);
    // console.log(this.address);
    // console.log(this.function);
    // console.log(this.scan_time);
    // console.log(this.low_limit);
    // console.log(this.high_limit);
    // console.log(this.unit);
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
