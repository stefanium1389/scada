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
import { DigitalInputDTO, createDigitalInputDTO, DigitalInputIdDTO, createDigitalInputIdDTO } from 'src/app/DTOs/DigitalInputDTO';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-digital-input',
  templateUrl: './digital-input.component.html',
  styleUrls: ['./digital-input.component.css']
})
export class DigitalInputComponent implements OnInit {

  album: boolean = false;
  album_key: string = "";
  file_key: string="";
  album_name: string="";
  displayedColumns: string[] = ['name', 'scan_time', 'state', 'address', 'function', 'actions'];
  dataSource = new MatTableDataSource<DigitalInputIdDTO>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /***************************************************************************** */

  // name: string = "";
  // description: string= "";
  // address: string = "";
  addresses: string[] = [];
  // function: string="";
  functions: string [] = ["SINUS","COSINUS", "RAMP"];
  // scan_time: number = 0;
  digitalInputForm!: FormGroup;
  dis: DigitalInputIdDTO[] = [];

  constructor(private dialog: MatDialog, private tagService: TagService) { }

  ngOnInit(): void {
    this.getAll();
    // for (let i = 1; i <= 10; i++) {
    //   this.dataSource.data.push( {name: "kris " + i, scan_time: i, isScanning: true, address: "Address " + i, function: 'SINUS',  description: 'string'});
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
    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    this.digitalInputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      function: new FormControl('', Validators.required),
      scan_time: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );
  }

  getAll() {
    this.tagService.getAllDigitalInputs().subscribe({
      next: result => {
        console.log(result);
        this.dis = result.results;
        this.dataSource = new MatTableDataSource<DigitalInputIdDTO>(this.dis);
      },
      error: err => {
        console.log(err);
        alert(err?.error?.message || JSON.stringify(err));
      }

    })
  }

  onSubmit() {
    let name = this.digitalInputForm.get('name')?.value;
    let description = this.digitalInputForm.get('description')?.value
    let address = this.digitalInputForm.get('address')?.value
    let functionn = this.digitalInputForm.get('function')?.value
    let scan_time = this.digitalInputForm.get('scan_time')?.value
    // console.log(this.name);
    // console.log(this.description);
    // console.log(this.address);
    // console.log(this.scan_time);
    // this.dataSource.data.push( {name: "krisNovi", scan_time: 20, isScanning: false, address: "Address 20", function: 'COSINUS', description: 'string'});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<DigitalInput>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource.data);
    let dto = createDigitalInputDTO(name, description, functionn, address, scan_time, true);
    console.log(dto);
    this.tagService.addDigitalInput(dto).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
        this.digitalInputForm.reset();
    //     this.dataSource.data.push( {Id: -1, Name: name, ScanTime: scan_time, IsScanning: true , Address: address, Function: functionn, LowLimit: low_limit, HighLimit: high_limit, Unit: unit, Description: description});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
        alert(err?.error?.message || JSON.stringify(err));
      }

    })
  }

  delete_tag(item: any) {
    console.log(item.id);
    this.tagService.deleteDigitalInput(item.id).subscribe({
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
        alert(err?.error?.message || JSON.stringify(err));
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
      data: {obj: obj, type:'di' /*date:this.someDate*/},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result!=undefined) {
        if (result.obj!=undefined) {
          console.log(result.obj);
          let p = result.obj;
          let a = createDigitalInputDTO(p.name, p.description, p.function, p.address, p.scanTime, p.isScanning);
          console.log('a');
          console.log(a);
          this.tagService.editDigitalInput(a, p.id).subscribe({
            next: result => {
              console.log(result);
              this.getAll();
            },
            error: err => {
              console.log(err);
              alert(err?.error?.message || JSON.stringify(err));
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

desc_tag(obj: DigitalInput) {
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

const ELEMENT_DATA: DigitalInputIdDTO[] = [];

interface DigitalInput {
  name: string;
  scan_time: number;
  isScanning: boolean;
  address: string;
  function: string;
  description: string;
}
