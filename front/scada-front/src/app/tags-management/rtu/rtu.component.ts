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
  selector: 'app-rtu',
  templateUrl: './rtu.component.html',
  styleUrls: ['./rtu.component.css']
})
export class RtuComponent implements OnInit {

  album: boolean = false;
  album_key: string = "";
  file_key: string="";
  album_name: string="";
  displayedColumns: string[] = ['id', 'address', 'units', 'actions'];
  dataSource = new MatTableDataSource<RTU>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   /*------------------------------------------------------------------*/


  id: string = "";
  address: string = "";
  addresses: string[] = [];
  low_limit: string = ""
  high_limit: string = ""
  rtuForm!: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.dataSource.data.push( {id: "kris " + i, address: "Address " + i, low: 5 + i, high: 10 + i});
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
    this.rtuForm = new FormGroup({
      address: new FormControl('', Validators.required),
      low_limit: new FormControl('', Validators.required),
      high_limit: new FormControl('', Validators.required),
      btn: new FormControl("")
    });
  }

  delete_tag(item: RTU) {
    const index = this.dataSource.data.indexOf(item);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource<RTU>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      }
  }

  edit_tag(obj: RTU) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {obj: obj, type:'rtu' /*date:this.someDate*/},
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
    this.address = this.rtuForm.get('address')?.value
    this.low_limit = this.rtuForm.get('low_limit')?.value
    this.high_limit = this.rtuForm.get('high_limit')?.value
    console.log(this.address);
    console.log(this.low_limit);
    console.log(this.high_limit);

    // iz nekog razloga ovo sve mora da se desi za update dok u onInit ima samo 1. linija ..................................... glupavi angular
    this.dataSource.data.push( {id: "kris top", address: "Address 20", low: 5 , high: 10 });
    // this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<RTU>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data);
  }

}

const ELEMENT_DATA: RTU[] = [];

interface RTU {
  id: string;
  address: string;
  low: number;
  high: number;
}
