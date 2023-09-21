import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { generate } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = ["S1", "S2", "S3", "C1", "C2", "C3", "R1", "R2", "R3"];
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
    // for (let i = 1; i <= 20; i++) {
    //   this.addresses.push("Address " + i)
    // }
    if (this.type == 'ai') {
      this.EditAnalogInputForm = new FormGroup({
        name: new FormControl(this.data.obj.name, Validators.required),
        description: new FormControl(this.data.obj.description, Validators.required),
        address: new FormControl(this.data.obj.address, Validators.required),
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
        low_limit: new FormControl(this.data.obj.minValue, Validators.required),
        high_limit: new FormControl(this.data.obj.maxValue, Validators.required),
        generate_time: new FormControl(this.data.obj.generateTime, Validators.required),
        btn: new FormControl("")},
      );
    }
   }

  onSubmit() {
    if (this.type == 'ai') {
      let name = this.EditAnalogInputForm.get('name')?.value;
      let description = this.EditAnalogInputForm.get('description')?.value
      let address = this.EditAnalogInputForm.get('address')?.value
      let scan_time = this.EditAnalogInputForm.get('scan_time')?.value
      let isScanning = this.EditAnalogInputForm.get('isScanning')?.value
      let low_limit = this.EditAnalogInputForm.get('low_limit')?.value
      let high_limit = this.EditAnalogInputForm.get('high_limit')?.value
      let unit = this.EditAnalogInputForm.get('unit')?.value
      console.log(name, description, address, scan_time, isScanning, low_limit, high_limit, unit);
      if (name == '' || description == '' || address == '' || scan_time === '' || low_limit === '' || high_limit === '' || unit == ''
      || name == null || description == null || address == null || scan_time === null || low_limit === null || high_limit === null || unit == null) 
      {
        alert('All fields must be filled!');
        return;
      } else {
        if (high_limit < low_limit) {
          alert ('High limit is smaller than low limit');
          return;
        } else {
          this.data.obj.name = name
          this.data.obj.description = description
          this.data.obj.address = address
          this.data.obj.scanTime = scan_time
          this.data.obj.isScanning = isScanning
          this.data.obj.lowLimit = low_limit
          this.data.obj.highLimit = high_limit
          this.data.obj.unit = unit
        }
      }
    } else if (this.type == 'di') {
      let name = this.EditDigitalInputForm.get('name')?.value;
      let description = this.EditDigitalInputForm.get('description')?.value
      let address = this.EditDigitalInputForm.get('address')?.value
      let scanTime = this.EditDigitalInputForm.get('scan_time')?.value
      let isScanning = this.EditDigitalInputForm.get('isScanning')?.value
      if (name == '' || description == '' || name == null || description == null || address == '' || scanTime === '' || scanTime === null || address == null) {
        alert('All fields must be filled!');
        return;
      } else {
        this.data.obj.name = name
        this.data.obj.description = description
        this.data.obj.address = address
        this.data.obj.scanTime = scanTime
        this.data.obj.isScanning = isScanning
      }
    } else if (this.type == 'ao') {
      let name = this.EditAnalogOutputForm.get('name')?.value;
      let description = this.EditAnalogOutputForm.get('description')?.value
      let address = this.EditAnalogOutputForm.get('address')?.value
      let low_limit = this.EditAnalogOutputForm.get('low_limit')?.value
      let high_limit = this.EditAnalogOutputForm.get('high_limit')?.value
      let unit = this.EditAnalogOutputForm.get('unit')?.value
      if (name == '' || description == '' || address == '' || low_limit === '' || high_limit === '' || unit == ''
      || name == null || description == null || address == null || low_limit === null || high_limit === null || unit == null) 
      {
        alert('All fields must be filled!');
        return;
      }
      else {
        if (high_limit < low_limit) {
          alert ('High limit is smaller than low limit');
          return;
        } else {
            this.data.obj.name = name
            this.data.obj.description = description
            this.data.obj.address = address
            this.data.obj.initialValue = this.initial_value_form;
            this.data.obj.lowLimit = low_limit
            this.data.obj.highLimit = high_limit
            this.data.obj.unit = unit
          }
        }
    } else if (this.type == 'do'){
      let name = this.EditDigitalOutputForm.get('name')?.value;
      let description = this.EditDigitalOutputForm.get('description')?.value
      let address = this.EditDigitalOutputForm.get('address')?.value
      if (name == '' || description == '' || name == null || description == null || address == '' || address == null) {
        alert('All fields must be filled!');
        return;
      } else {
        this.data.obj.name = name
        this.data.obj.description = description
        this.data.obj.address = address
        this.data.obj.initialValue = this.initial_value_form;
      }
    } else {
      let address = this.editRtuForm.get('address')?.value
      let low_limit = this.editRtuForm.get('low_limit')?.value
      let high_limit = this.editRtuForm.get('high_limit')?.value
      let generate_time = this.editRtuForm.get('generate_time')?.value
      if ( address == '' || generate_time === '' || low_limit === '' || high_limit === ''
      || address == null || generate_time === null || low_limit === null || high_limit === null) 
    {
      alert('All fields must be filled!');
      return;
    }

    else {
      if (high_limit < low_limit) {
        alert ('High limit is smaller than low limit');
        return;
      } else {
          this.data.obj.address = address
          this.data.obj.minValue = low_limit
          this.data.obj.maxValue = high_limit
          this.data.obj.generateTime = generate_time
      }
    }
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
