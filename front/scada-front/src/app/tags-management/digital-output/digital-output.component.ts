import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  dataSource = new MatTableDataSource<UserAccess>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /********************************************************************************* */

  name: string = "";
  description: string= "";
  address: string = "";
  addresses: string[] = [];
  initial_value: number = 0;
  digitalOutputForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
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

    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'cos', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'ramp', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Off", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "On", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    this.dataSource.data.push( {name: "kris", scan_time: "krisA", state: "Of", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
  }

  onSubmit() {
    this.name = this.digitalOutputForm.get('name')?.value;
    this.description = this.digitalOutputForm.get('description')?.value
    this.address = this.digitalOutputForm.get('address')?.value
    this.initial_value = this.digitalOutputForm.get('initial_value')?.value
    console.log(this.name);
    console.log(this.description);
    console.log(this.address);
    console.log(this.initial_value);
    this.dataSource.data.push( {name: "krisNovi", scan_time: "krisA", state: "Of", address: "krisC", function: 'sin', low: 5, high: 10, unit: 'C'});
    // this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<UserAccess>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data);
  }

  give_access(userAccess: UserAccess) {
    console.log('kris');
  }

  remove_access(userAccess: UserAccess) {}

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
}
