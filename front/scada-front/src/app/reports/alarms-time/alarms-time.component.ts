import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alarms-time',
  templateUrl: './alarms-time.component.html',
  styleUrls: ['./alarms-time.component.css']
})
export class AlarmsTimeComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  dataSource = new MatTableDataSource<AlarmReportItem>(ELEMENT_DATA);
  displayedColumns: string[] = ['time', 'priority'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  processReport() {
    if (this.startDate > this.endDate) {
      alert('Start date must be before end date.');
      return;
    }
  }

}

const ELEMENT_DATA: AlarmReportItem[] = [{time:"123",priority:"400"}];

interface AlarmReportItem {
  time: string;
  priority: string;
}
