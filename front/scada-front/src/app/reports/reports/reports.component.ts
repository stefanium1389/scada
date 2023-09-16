import { Component, OnInit } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay'; // Make sure to import ComponentType
import { AiLastComponent } from '../ai-last/ai-last.component';
import { AlarmsPriorityComponent } from '../alarms-priority/alarms-priority.component';
import { AlarmsTimeComponent } from '../alarms-time/alarms-time.component';
import { DiLastComponent } from '../di-last/di-last.component';
import { TagIdComponent } from '../tag-id/tag-id.component';
import { TagsTimeComponent } from '../tags-time/tags-time.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selectedReport: string | null = null;

  // Define your array of report types with associated components
  reportTypes = [
    { name: 'Alarms in Time Period', component: AlarmsTimeComponent },
    { name: 'Alarms by Priority', component: AlarmsPriorityComponent },
    { name: 'Tags in Time Period', component: TagsTimeComponent },
    { name: 'Last Values of Analog Inputs', component: AiLastComponent },
    { name: 'Last Values of Digital Inputs', component: DiLastComponent },
    { name: 'All Tag Values with Specific Identifier', component: TagIdComponent },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Method to dynamically get the selected report component
  getComponent(reportType: string | null): ComponentType<any> | null {
    if (reportType) {
      const selectedReport = this.reportTypes.find(report => report.name === reportType);
      if (selectedReport) {
        return selectedReport.component;
      }
    }
    return null;
  }
}