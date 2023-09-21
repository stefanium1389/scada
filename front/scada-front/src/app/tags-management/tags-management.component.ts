import { Component, OnInit } from '@angular/core';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-tags-management',
  templateUrl: './tags-management.component.html',
  styleUrls: ['./tags-management.component.css']
})
export class TagsManagementComponent implements OnInit {

  unitsFrom: string = ""
    unitsTo: string = ""
    unit: string = ""

  constructor(private SystemService: SystemService) { }

  ngOnInit(): void {
    this.stopSimulation();
  }
  stopSimulation(){
    this.SystemService.stopSystemSimulation().subscribe({
      next: result => {
        // alert(result.message);
        console.log(result.message);
      },
      error: err => {
        console.log(err);
        alert(err?.error?.message || JSON.stringify(err));
      }
    })
  }
}
