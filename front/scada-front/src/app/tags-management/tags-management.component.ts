import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-management',
  templateUrl: './tags-management.component.html',
  styleUrls: ['./tags-management.component.css']
})
export class TagsManagementComponent implements OnInit {

  unitsFrom: string = ""
    unitsTo: string = ""
    unit: string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
