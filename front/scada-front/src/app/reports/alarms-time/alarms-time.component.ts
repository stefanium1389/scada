import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-alarms-time',
  templateUrl: './alarms-time.component.html',
  styleUrls: ['./alarms-time.component.css']
})
export class AlarmsTimeComponent implements OnInit {
  startDate: Date | null = null; 
  startTime: string = ''; 
  endDate: Date | null = null;
  endTime: string = '';

  dataSource = new MatTableDataSource<AlarmReportItem>(ELEMENT_DATA);
  displayedColumns: string[] = ['time', 'priority'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = ELEMENT_DATA; // Assign your data
  }

  processReport() {
    if (!this.startDate || !this.startTime || !this.endDate || !this.endTime) {
      alert('Please select both start and end date and time.');
      return;
    }

    const startDateTime = new Date(this.startDate);
    const startTimeParts = this.startTime.split(':');
    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);
    startDateTime.setHours(startHour, startMinute);

    const endDateTime = new Date(this.endDate);
    const endTimeParts = this.endTime.split(':');
    const endHour = parseInt(endTimeParts[0], 10);
    const endMinute = parseInt(endTimeParts[1], 10);
    endDateTime.setHours(endHour, endMinute);


    if (startDateTime >= endDateTime) {
      alert('Start date and time must be before the end date and time.');
      return;
    }

  }
}

const ELEMENT_DATA: AlarmReportItem[] = [
  { time: new Date("2023-03-11T14:30:00"), priority: 1 },
  { time: new Date("2023-03-12T13:45:00"), priority: 2 },
  { time: new Date("2023-03-13T14:55:00"), priority: 4 },
  { time: new Date("2023-09-12T11:45:00"), priority: 3 },
  { time: new Date("2023-05-11T15:30:00"), priority: 4 },
  { time: new Date("2023-05-11T12:45:00"), priority: 1 },

];

interface AlarmReportItem {
  time: Date;
  priority: number;
}
