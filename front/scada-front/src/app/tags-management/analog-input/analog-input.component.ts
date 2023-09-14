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
import { AnalogInputDTO, createAnalogInputDTO, AnalogInputIdDTO, createAnalogInputIdDTO } from 'src/app/DTOs/AnalogInputDTO';
import { TagService } from 'src/app/services/tag.service';


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
  displayedColumns: string[] = ['name', 'scan_time', 'state', 'address', 'units', 'actions'];
  dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   /*------------------------------------------------------------------*/


  // name: string = "";
  // description: string= "";
  // address: string = "";
  addresses: string[] = ["S1", "S2", "S3", "C1", "C2", "C3", "R1", "R2", "R3"];
  // function: string="";
  // functions: string [] = ["SINUS","COSINUS", "RAMP"];
  // scan_time: number = 0;
  // low_limit: string = ""
  // high_limit: string = ""
  // unit: string = ""
  analogInputForm!: FormGroup;
  ais: AnalogInputIdDTO[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog, private tagService: TagService) { }

  ngOnInit(): void {
    this.getAll();
    // for (let i = 1; i <= 10; i++) {
    //   this.dataSource.data.push( {name: "kris " + i, scan_time: i, isScanning: true, address: "Address " + i, function: 'RAMP', low: 5 + i, high: 10 + i, unit: 'C', description: 'string'});
    // }
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

    // for (let i = 1; i <= 20; i++) {
    //   this.addresses.push("Address " + i)
    // }
    this.analogInputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      scan_time: new FormControl('', Validators.required), // Set a default numeric value here
      low_limit: new FormControl('', Validators.required), // Set a default numeric value here
      high_limit: new FormControl('', Validators.required), // Set a default numeric value here
      unit: new FormControl('', Validators.required),
      btn: new FormControl("")
    });
  }

  getAll() {
    this.tagService.getAllAnalogInputs().subscribe({
      next: result => {
        console.log(result);
        this.ais = result.results;
        this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(this.ais);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
        // alert(err?.message || JSON.stringify(err));
        alert('Failed to get analog inputs');
      }

    })
  }

  alarms(item: any) {
    console.log(item);
    this.router.navigate(['alarms'], { queryParams: { id: item.id, name: item.name, unit:item.unit}} );
  }

  delete_tag(item: any) {
    console.log(item.id);
    this.tagService.deleteAnalogInput(item.id).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
        // const index = this.dataSource.data.indexOf(item);
        // if (index !== -1) {
        //   this.dataSource.data.splice(index, 1);
        //   this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);
        //   this.dataSource.paginator = this.paginator;
        // }
      },
      error: err => {
        console.log(err);
        alert('Failed to delete analog input');
        // alert(err?.error?.message || JSON.stringify(err));
      }

    })
    // const index = this.dataSource.data.indexOf(item);
    //   if (index !== -1) {
    //     this.dataSource.data.splice(index, 1);
    //     this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);
    //     this.dataSource.paginator = this.paginator;
    //   }
  }

  edit_tag(obj: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {obj: obj, type:'ai' /*date:this.someDate*/},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result!=undefined) {
        if (result.obj!=undefined) {
          console.log(result.obj);
          let p = result.obj;
          let a = createAnalogInputDTO(p.name, p.description, p.address, p.scanTime, p.isScanning, p.lowLimit, p.highLimit, p.unit);
          console.log('a');
          console.log(a);
          this.tagService.editAnalogInput(a, p.id).subscribe({
            next: result => {
              console.log(result);
              this.getAll();
            },
            error: err => {
              console.log(err);
              alert('Failed to edit analog input');
              // alert(err?.error?.message || JSON.stringify(err));
            }
      
          })
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

desc_tag(obj: any) {
  console.log(obj);
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
    let name = this.analogInputForm.get('name')?.value;
    let description = this.analogInputForm.get('description')?.value
    let address = this.analogInputForm.get('address')?.value
    let scan_time = this.analogInputForm.get('scan_time')?.value
    let low_limit = this.analogInputForm.get('low_limit')?.value
    let high_limit = this.analogInputForm.get('high_limit')?.value
    let unit = this.analogInputForm.get('unit')?.value
    // console.log(this.name);
    // console.log(this.description);
    // console.log(this.address);
    // console.log(this.function);
    // console.log(this.scan_time);
    // console.log(this.low_limit);
    // console.log(this.high_limit);
    // console.log(this.unit);
    let dto = createAnalogInputDTO(name, description, address, scan_time, true, low_limit, high_limit, unit);
    console.log(dto);
    this.tagService.addAnalogInput(dto).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
        this.analogInputForm.reset();
    //     this.dataSource.data.push( {Id: -1, Name: name, ScanTime: scan_time, IsScanning: true , Address: address, Function: functionn, LowLimit: low_limit, HighLimit: high_limit, Unit: unit, Description: description});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
      },
      error: err => {
        // console.log(err);
        alert('Failed to add analog input');
        alert(err?.error?.message || JSON.stringify(err));
      }

    })



    // iz nekog razloga ovo sve mora da se desi za update dok u onInit ima samo 1. linija ..................................... glupavi angular
    // this.dataSource.data.push( {Id: -1, Name: name, ScanTime: scan_time, IsScanning: true , Address: address, Function: functionn, LowLimit: low_limit, HighLimit: high_limit, Unit: unit, Description: description});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource.data);
  }

}

const ELEMENT_DATA: AnalogInputIdDTO[] = [];

interface AnalogInput {
  name: string;
  scan_time: number;
  isScanning: boolean;
  address: string;
  function: string;
  low: number;
  high: number;
  unit: string;
  description: string;
}

