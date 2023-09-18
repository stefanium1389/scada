import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AlarmReportItem } from '../alarms-time/alarms-time.component';

@Component({
  selector: 'app-alarms-priority',
  templateUrl: './alarms-priority.component.html',
  styleUrls: ['./alarms-priority.component.css']
})
export class AlarmsPriorityComponent implements OnInit {

  selectedPriority: number = 0;

  dataSource = new MatTableDataSource<AlarmReportItem>([]);
  displayedColumns: string[] = ['type', 'limit', 'tagName'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  typeMap: { [key: number]: string } = {
    0: 'Above',
    1: 'Below',
  };

  constructor(private reportService: ReportService) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  processReport() {
    if (this.selectedPriority === null || this.selectedPriority === undefined) {
      alert('Please select an alarm priority.');
      return;
    }

    this.reportService.alarmsPriority(this.selectedPriority).subscribe({
      next: result => {
        console.log(result);
    
        if (Array.isArray(result.results)) {
          if (result.results.length === 0) {
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



