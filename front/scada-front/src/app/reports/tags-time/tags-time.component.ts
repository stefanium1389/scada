import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AlarmReportItem } from '../alarms-time/alarms-time.component';

@Component({
  selector: 'app-tags-time',
  templateUrl: './tags-time.component.html',
  styleUrls: ['./tags-time.component.css']
})
export class TagsTimeComponent implements OnInit {

  startDate: Date | null = null;
  startTime: string = '';
  endDate: Date | null = null;
  endTime: string = '';

  dataSource = new MatTableDataSource<TagReportItem>([]);
  displayedColumns: string[] = ['name', 'type','value', 'low_limit', 'high_limit', 'scan_time', 'timestamp'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  typeMap: { [key: number]: string } = {
    0: 'Analog',
    1: 'Digital',
  };

  constructor(private reportService: ReportService) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

    this.reportService.tagsTime(startDateTime, endDateTime).subscribe({
      next: result => {
        console.log(result);
    
        if (Array.isArray(result.results)) {
          if (result.results.length === 0) {
            console.log('No tag records found.');
          } else {
            const mappedData: TagReportItem[] = result.results.map((item: any) => ({
              timestamp: new Date(item.timestamp),
              low_limit: item.lowLimit,
              high_limit : item.highLimit,
              scan_time: item.scanTime,
              type: item.type,
              name: item.name,
              value: item.value
            }));
    
            this.dataSource.data = mappedData;
          }
        } else {
          console.error('Result.results is not an array:', result.results);
        }
    
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
        // alert(err?.message || JSON.stringify(err));
        alert(err);
      }
    });
    
  }
}

export interface TagReportItem {
  timestamp: Date;
  type: number;
  low_limit: number;
  high_limit: number;
  name: string;
  scan_time : number;
  value: number;
}