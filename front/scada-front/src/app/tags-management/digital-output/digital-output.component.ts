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
import { DigitalOutputDTO, createDigitalOutputDTO, DigitalOutputIdDTO, createDigitalOutputIdDTO } from 'src/app/DTOs/DigitalOutputDTO';

@Component({
  selector: 'app-digital-output',
  templateUrl: './digital-output.component.html',
  styleUrls: ['./digital-output.component.css']
})
export class DigitalOutputComponent implements OnInit {

  album: boolean = false;
  album_key: string = "";
  file_key: string="";
  album_name: string="";
  displayedColumns: string[] = ['name', 'address', 'actions'];
  dataSource = new MatTableDataSource<DigitalOutputIdDTO>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /********************************************************************************* */

  // name: string = "";
  // description: string= "";
  // address: string = "";
  addresses: string[] = [];
  // initial_value: number = 0;
  digitalOutputForm!: FormGroup;
  dos: DigitalOutputIdDTO[] = []

  constructor(private dialog: MatDialog, private tagService: TagService) { }

  ngOnInit(): void {
    this.getAll();
    // for (let i = 1; i <= 10; i++) {
    //   this.dataSource.data.push( {name: "kris " + i, address: "Address " + i,  description: 'string', initial_value: i});
    // }
    
    for (let i = 1; i <= 20; i++) {
      this.addresses.push("Address " + i)
    }
    this.digitalOutputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      initial_value: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );

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
  }

  getAll() {
    this.tagService.getAllDigitalOutputs().subscribe({
      next: result => {
        console.log(result);
        this.dos = result.results;
        this.dataSource = new MatTableDataSource<DigitalOutputIdDTO>(this.dos);
      },
      error: err => {
        console.log(err);
        // alert(err?.error?.message || JSON.stringify(err));
        alert('Failed to get digital outputs');
      }

    })
  }

  onSubmit() {
    let name = this.digitalOutputForm.get('name')?.value;
    let description = this.digitalOutputForm.get('description')?.value
    let address = this.digitalOutputForm.get('address')?.value
    let initial_value = this.digitalOutputForm.get('initial_value')?.value
    // console.log(this.name);
    // console.log(this.description);
    // console.log(this.address);
    // console.log(this.initial_value);
    // this.dataSource.data.push( {name: "krisNovi", address: "Address 20", description: 'string', initial_value: 4});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<DigitalOutput>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource.data);
    let dto = createDigitalOutputDTO(name, description, address, initial_value);
    console.log(dto);
    this.tagService.addDigitalOutput(dto).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
        this.digitalOutputForm.reset();
    //     this.dataSource.data.push( {Id: -1, Name: name, ScanTime: scan_time, IsScanning: true , Address: address, Function: functionn, LowLimit: low_limit, HighLimit: high_limit, Unit: unit, Description: description});
    // // this.changeDetectorRef.detectChanges();
    // this.dataSource = new MatTableDataSource<AnalogInputIdDTO>(ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
        // alert(err?.error?.message || JSON.stringify(err));
        alert('Failed to add digital output');
      }

    })
  }

  delete_tag(item: any) {
    console.log(item.id);
    this.tagService.deleteDigitalOutput(item.id).subscribe({
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
        // alert(err?.error?.message || JSON.stringify(err));
        alert('Failed to delete digital output');
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
      data: {obj: obj, type:'do' /*date:this.someDate*/},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result!=undefined) {
        if (result.obj!=undefined) {
          console.log(result.obj);
          let p = result.obj;
          let a = createDigitalOutputDTO(p.name, p.description, p.address, p.initialValue);
          console.log('a');
          console.log(a);
          this.tagService.editDigitalOutput(a, p.id).subscribe({
            next: result => {
              console.log(result);
              this.getAll();
            },
            error: err => {
              console.log(err);
              // alert(err?.error?.message || JSON.stringify(err));
              alert('Failed to edit digital output');
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

desc_tag(obj: DigitalOutput) {
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

const ELEMENT_DATA: DigitalOutputIdDTO[] = [];

interface DigitalOutput {
  name: string;
  address: string;
  description: string;
  initial_value: number;
}
