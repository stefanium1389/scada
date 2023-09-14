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
import { TagService } from 'src/app/services/tag.service';
import { AnalogOutputDTO, createAnalogOutputDTO, AnalogOutputIdDTO, createAnalogOutputIdDTO } from 'src/app/DTOs/AnalogOutputDTO';
import { ChangeValueComponent } from '../change-value/change-value.component';
import { AnalogValueDTO, createAnalogValueDTO } from 'src/app/DTOs/CurrentValueDTO';

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
  displayedColumns: string[] = ['name', 'address', 'current_value', 'last_changed', 'units', 'actions'];
  dataSource = new MatTableDataSource<AnalogOutputIdDTO>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /*------------------------------------------------------------------*/

  // name: string = "";
  // description: string= "";
  // address: string = "";
  addresses: string[] = ["S1", "S2", "S3", "C1", "C2", "C3", "R1", "R2", "R3"];
  // initial_value: number = 0;
  // low_limit: string = ""
  // high_limit: string = ""
  // unit: string = ""
  analogOutputForm!: FormGroup;
  aos: AnalogOutputIdDTO[] = [];

  constructor(private dialog: MatDialog, private tagService: TagService) { }

  ngOnInit(): void {
    this.getAll();
    // for (let i = 1; i <= 10; i++) {
    //   this.dataSource.data.push( {name: "kris " + i, address: "Address " + i, low: 5 + i, high: 10 + i, unit: 'C', description: 'string', initial_value: i});
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

  getAll() {
    this.tagService.getAllAnalogOutputs().subscribe({
      next: result => {
        console.log(result);
        this.aos = result.results;
        this.dataSource = new MatTableDataSource<AnalogOutputIdDTO>(this.aos);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
        // alert(err?.error?.message || JSON.stringify(err));
        alert('Failed to get analog outputs');
      }

    })
  }

  onSubmit() {
    let name = this.analogOutputForm.get('name')?.value;
    let description = this.analogOutputForm.get('description')?.value
    let address = this.analogOutputForm.get('address')?.value
    let initial_value = this.analogOutputForm.get('initial_value')?.value
    let low_limit = this.analogOutputForm.get('low_limit')?.value
    let high_limit = this.analogOutputForm.get('high_limit')?.value
    let unit = this.analogOutputForm.get('unit')?.value
    // console.log(this.name);
    // console.log(this.description);
    // console.log(this.address);
    // console.log(this.initial_value);
    // console.log(this.low_limit);
    // console.log(this.high_limit);
    // console.log(this.unit);

    // this.dataSource.data.push( {name: "krisNovi", address: "Address 20",  low: 5, high: 10, unit: 'C', description: 'string', initial_value: 4});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<AnalogOutput>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource.data);

    let dto = createAnalogOutputDTO(name, description, address, initial_value, low_limit, high_limit, unit);
    console.log(dto);
    this.tagService.addAnalogOutput(dto).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
        this.analogOutputForm.reset();
    //     this.dataSource.data.push( {Id: -1, Name: name, ScanTime: scan_time, IsScanning: true , Address: address, Function: functionn, LowLimit: low_limit, HighLimit: high_limit, Unit: unit, Description: description});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
        alert('Failed to add analog output');
        // alert(err?.error?.message || JSON.stringify(err));
      }

    })
  }

  

  delete_tag(item: any) {
    console.log(item.id);
    this.tagService.deleteAnalogOutput(item.id).subscribe({
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
        alert('Failed to delete analog output');
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
      data: {obj: obj, type:'ao' /*date:this.someDate*/},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result!=undefined) {
        if (result.obj!=undefined) {
          console.log(result.obj);
          let p = result.obj;
          let a = createAnalogOutputDTO(p.name, p.description, p.address, p.initialValue, p.lowLimit, p.highLimit, p.unit);
          console.log('a');
          console.log(a);
          this.tagService.editAnalogOutput(a, p.id).subscribe({
            next: result => {
              console.log(result);
              this.getAll();
            },
            error: err => {
              console.log(err);
              // alert(err?.error?.message || JSON.stringify(err));
              alert('Failed to edit analog output');
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

edit_current_value(obj: any) {
  const dialogRef = this.dialog.open(ChangeValueComponent, {
    data: {obj: obj, type:'ao' /*date:this.someDate*/},
    panelClass: 'my-dialog-container-class',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result!=undefined) {
      if (result.obj!=undefined) {
        console.log(result.obj);
        let p = result.obj;
        let a = createAnalogValueDTO(p.currentValue);
        console.log('a');
        console.log(a);
        this.tagService.editAnalogOutputValue(a, p.id).subscribe({
          next: result => {
            console.log(result);
            this.getAll();
          },
          error: err => {
            console.log(err);
            // alert(err?.error?.message || JSON.stringify(err));
            alert('Failed to edit analog output value');
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

desc_tag(obj: AnalogOutput) {
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

const ELEMENT_DATA: AnalogOutputIdDTO[] = [];

interface AnalogOutput {
  name: string;
  address: string;
  low: number;
  high: number;
  unit: string;
  description: string;
  initial_value: number;
}