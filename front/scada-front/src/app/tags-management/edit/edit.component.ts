import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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
  functions: string [] = ["SINUS","COSINUS", "RAMP"];
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
  editRtuForm!: FormGroup;


  getData: boolean=false;


  isScanning: boolean = false;
  toggle_label: string = 'Off'

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<EditComponent>) {
  }

  firstFormGroup = this._formBuilder.group({
    // date: this.currentDate
  });

  ngOnInit(): void {
    console.log(this.data);
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
        scan_time: new FormControl(this.data.obj.scanTime, Validators.required), // Set a default numeric value here
        low_limit: new FormControl(this.data.obj.lowLimit, Validators.required), // Set a default numeric value here
        high_limit: new FormControl(this.data.obj.highLimit, Validators.required), // Set a default numeric value here
        unit: new FormControl(this.data.obj.unit, Validators.required),
        isScanning: new FormControl(this.data.obj.isScanning, Validators.required),
        btn: new FormControl("")
      });
      this.isScanning = this.data.obj.isScanning;
      if (this.isScanning) {
        this.toggle_label = 'On';
      } else {
        this.toggle_label = 'Off';
      }
    } else if (this.type == 'di') {
      this.EditDigitalInputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
        function: new FormControl(this.data.obj.function, Validators.required),
        scan_time: new FormControl(this.data.obj.scanTime, Validators.required),
        isScanning: new FormControl(this.data.obj.isScanning, Validators.required),
        btn: new FormControl("")},
      );
      this.isScanning = this.data.obj.isScanning;
      if (this.isScanning) {
        this.toggle_label = 'On';
      } else {
        this.toggle_label = 'Off';
      }
    } else if (this.type == 'ao') {
      this.initial_value_form = this.data.obj.initialValue;
      this.EditAnalogOutputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
        //initial_value: new FormControl(this.data.obj.initial_value, Validators.required),
        low_limit: new FormControl(this.data.obj.lowLimit, Validators.required),
        high_limit: new FormControl(this.data.obj.highLimit, Validators.required),
        unit: new FormControl(this.data.obj.unit, Validators.required),
        btn: new FormControl("")},
      );
    } else if (this.type == 'do'){
      this.initial_value_form = this.data.obj.initialValue;
      this.EditDigitalOutputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
        // initial_value: new FormControl('', Validators.required),
        btn: new FormControl("")},
      );
    } else {
      this.editRtuForm = new FormGroup({
        address: new FormControl(this.data.obj.address, Validators.required),
        low_limit: new FormControl(this.data.obj.lowLimit, Validators.required),
        high_limit: new FormControl(this.data.obj.highLimit, Validators.required),
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
      this.data.obj.scanTime = this.EditAnalogInputForm.get('scan_time')?.value
      this.data.obj.isScanning = this.EditAnalogInputForm.get('isScanning')?.value
      this.data.obj.lowLimit = this.EditAnalogInputForm.get('low_limit')?.value
      this.data.obj.highLimit = this.EditAnalogInputForm.get('high_limit')?.value
      this.data.obj.unit = this.EditAnalogInputForm.get('unit')?.value
    } else if (this.type == 'di') {
      this.data.obj.name = this.EditDigitalInputForm.get('name')?.value;
      this.data.obj.description = this.EditDigitalInputForm.get('description')?.value
      this.data.obj.address = this.EditDigitalInputForm.get('address')?.value
      this.data.obj.function = this.EditDigitalInputForm.get('function')?.value
      this.data.obj.scanTime = this.EditDigitalInputForm.get('scan_time')?.value
      this.data.obj.isScanning = this.EditDigitalInputForm.get('isScanning')?.value
    } else if (this.type == 'ao') {
      this.data.obj.name = this.EditAnalogOutputForm.get('name')?.value;
      this.data.obj.description = this.EditAnalogOutputForm.get('description')?.value
      this.data.obj.address = this.EditAnalogOutputForm.get('address')?.value
      this.data.obj.initialValue = this.initial_value_form;
      this.data.obj.lowLimit = this.EditAnalogOutputForm.get('low_limit')?.value
      this.data.obj.highLimit = this.EditAnalogOutputForm.get('high_limit')?.value
      this.data.obj.unit = this.EditAnalogOutputForm.get('unit')?.value
    } else if (this.type == 'do'){
      this.data.obj.name = this.EditDigitalOutputForm.get('name')?.value;
      this.data.obj.description = this.EditDigitalOutputForm.get('description')?.value
      this.data.obj.address = this.EditDigitalOutputForm.get('address')?.value
      this.data.obj.initialValue = this.initial_value_form;
    } else {
      this.data.obj.address = this.editRtuForm.get('address')?.value
      this.data.obj.lowLimit = this.editRtuForm.get('low_limit')?.value
      this.data.obj.highLimit = this.editRtuForm.get('high_limit')?.value
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

  onToggleClick(event: MatSlideToggleChange) {
    // Update the toggleState variable to reflect the new state
    this.isScanning = event.checked;
    console.log('Toggle state:', this.isScanning);
    if (this.isScanning) {
      this.toggle_label = 'On';
    } else {
      this.toggle_label = 'Off';
    }
    // Add your logic here
  }

}
