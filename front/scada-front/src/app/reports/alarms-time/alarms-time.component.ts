import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  dataSource = new MatTableDataSource<AlarmReportItem>([]);
  displayedColumns: string[] = ['timestamp', 'priority', 'type', 'limit', 'tagName'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  priorityMap: { [key: number]: string } = {
    0: 'Low',
    1: 'Medium',
    2: 'High',
  };
  
  typeMap: { [key: number]: string } = {
    0: 'Above',
    1: 'Below',
  };

  constructor(private reportService: ReportService, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showNoResultsSnackBar() {
    this.snackBar.open('No results found', 'Close', {
      duration: 3000, 
      verticalPosition: 'bottom',
    });
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

    this.reportService.alarmsTime(startDateTime, endDateTime).subscribe({
      next: result => {
        console.log(result);
    
        if (Array.isArray(result.results)) {
          if (result.results.length === 0) {
            this.showNoResultsSnackBar();
            console.log('No alarm records found.');
          } else {
            const mappedData: AlarmReportItem[] = result.results.map((item: any) => ({
              timestamp: new Date(item.timestamp),
              priority: item.priority,
              type: item.type,
              limit: item.limit,
              tagName: item.tagName,
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

export interface AlarmReportItem {
  timestamp: Date;
  priority: number;
  type: number;
  limit: number;
  tagName: string;
}


