import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditComponent } from '../edit/edit.component';
import { DescriptionComponent } from '../description/description.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-analog-output',
  templateUrl: './analog-output.component.html',
  styleUrls: ['./analog-output.component.css']
})
export class AnalogOutputComponent implements OnInit {

  album: boolean = false;
  album_key: string = "";
  file_key: string="";
  album_name: string="";
  displayedColumns: string[] = ['name', 'address', 'units', 'actions'];
  dataSource = new MatTableDataSource<UserAccess>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /*------------------------------------------------------------------*/

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = [];
  initial_value: number = 0;
  low_limit: string = ""
  high_limit: string = ""
  unit: string = ""
  analogOutputForm!: FormGroup;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

    for (let i = 1; i <= 10; i++) {
      this.dataSource.data.push( {name: "kris " + i, scan_time: "" + i, state: "On", address: "Address " + i, function: 'Cosinus', low: 5 + i, high: 10 + i, unit: 'C', description: 'string', initial_value: i});
    }

    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'cos', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'ramp', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Of", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});

    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    this.analogOutputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      initial_value: new FormControl('', Validators.required),
      low_limit: new FormControl('', Validators.required),
      high_limit: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );
  }

  onSubmit() {
    this.name = this.analogOutputForm.get('name')?.value;
    this.description = this.analogOutputForm.get('description')?.value
    this.address = this.analogOutputForm.get('address')?.value
    this.initial_value = this.analogOutputForm.get('initial_value')?.value
    this.low_limit = this.analogOutputForm.get('low_limit')?.value
    this.high_limit = this.analogOutputForm.get('high_limit')?.value
    this.unit = this.analogOutputForm.get('unit')?.value
    console.log(this.name);
    console.log(this.description);
    console.log(this.address);
    console.log(this.initial_value);
    console.log(this.low_limit);
    console.log(this.high_limit);
    console.log(this.unit);

    this.dataSource.data.push( {name: "krisNovi", scan_time: "krisA", state: "Of", address: "Address 20", function: 'Sinus', low: 5, high: 10, unit: 'C', description: 'string', initial_value: 4});
    // this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<UserAccess>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data);
  }

  
  give_access(userAccess: UserAccess) {
    console.log('kris');
  }

  edit_tag(obj: UserAccess) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {obj: obj, type:'ao' /*date:this.someDate*/},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result!=undefined) {
        if (result.date!=undefined) {
          // ride = {
          //   "locations": obj.locations,
          //   "passengers": obj.passengers,
          //   "vehicleType": obj.vehicleType,
          //   "babyTransport": obj.babyTransport,
          //   "petTransport": obj.petTransport,
          //   "scheduledTime": result.scheduledTime + ":00.000Z"
          // };
        } else {
          // ride = {
          //   "locations": obj.locations,
          //   "passengers": obj.passengers,
          //   "vehicleType": obj.vehicleType,
          //   "babyTransport": obj.babyTransport,
          //   "petTransport": obj.petTransport
          // };
        };
    } ;
  });
}

desc_tag(obj: UserAccess) {
  const dialogRef = this.dialog.open(DescriptionComponent, {
    data: {obj: obj.description, /*date:this.someDate*/},
    panelClass: 'my-dialog-container-class',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result!=undefined) {
      if (result.date!=undefined) {
        // ride = {
        //   "locations": obj.locations,
        //   "passengers": obj.passengers,
        //   "vehicleType": obj.vehicleType,
        //   "babyTransport": obj.babyTransport,
        //   "petTransport": obj.petTransport,
        //   "scheduledTime": result.scheduledTime + ":00.000Z"
        // };
      } else {
        // ride = {
        //   "locations": obj.locations,
        //   "passengers": obj.passengers,
        //   "vehicleType": obj.vehicleType,
        //   "babyTransport": obj.babyTransport,
        //   "petTransport": obj.petTransport
        // };
      };
    } ;
  });
}

}

const ELEMENT_DATA: UserAccess[] = [];

interface UserAccess {
  name: string;
  scan_time: string;
  state: string;
  address: string;
  function: string;
  low: number;
  high: number;
  unit: string;
  description: string;
  initial_value: number;
}