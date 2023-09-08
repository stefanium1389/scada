import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';
import { DescriptionComponent } from '../description/description.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-analog-input',
  templateUrl: './analog-input.component.html',
  styleUrls: ['./analog-input.component.css']
})
export class AnalogInputComponent implements OnInit {

  album: boolean = false;
  album_key: string = "";
  file_key: string="";
  album_name: string="";
  displayedColumns: string[] = ['name', 'scan_time', 'state', 'address', 'function', 'units', 'actions'];
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
  function: string="";
  functions: string [] = ["Sinus","Cosinus", "Ramp"];
  scan_time: number = 0;
  low_limit: string = ""
  high_limit: string = ""
  unit: string = ""
  analogInputForm!: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.dataSource.data.push( {name: "kris " + i, scan_time: "" + i, state: "On", address: "Address " + i, function: 'Sinus', low: 5 + i, high: 10 + i, unit: 'C', description: 'string'});
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
    this.analogInputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      function: new FormControl('', Validators.required),
      scan_time: new FormControl('', Validators.required), // Set a default numeric value here
      low_limit: new FormControl('', Validators.required), // Set a default numeric value here
      high_limit: new FormControl('', Validators.required), // Set a default numeric value here
      unit: new FormControl('', Validators.required),
      btn: new FormControl("")
    });
  }

  give_access(userAccess: UserAccess) {
    console.log('kris');
  }

  edit_tag(obj: UserAccess) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {obj: obj, type:'ai' /*date:this.someDate*/},
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

  onSubmit() {
    this.name = this.analogInputForm.get('name')?.value;
    this.description = this.analogInputForm.get('description')?.value
    this.address = this.analogInputForm.get('address')?.value
    this.function = this.analogInputForm.get('function')?.value
    this.scan_time = this.analogInputForm.get('scan_time')?.value
    this.low_limit = this.analogInputForm.get('low_limit')?.value
    this.high_limit = this.analogInputForm.get('high_limit')?.value
    this.unit = this.analogInputForm.get('unit')?.value
    console.log(this.name);
    console.log(this.description);
    console.log(this.address);
    console.log(this.function);
    console.log(this.scan_time);
    console.log(this.low_limit);
    console.log(this.high_limit);
    console.log(this.unit);

    // iz nekog razloga ovo sve mora da se desi za update dok u onInit ima samo 1. linija ..................................... glupavi angular
    this.dataSource.data.push( {name: "krisNovi", scan_time: "krisA", state: "Of", address: "Address 10", function: 'Cosinus', low: 5, high: 10, unit: 'C', description: 'string'});
    // this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<UserAccess>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data);
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
}

