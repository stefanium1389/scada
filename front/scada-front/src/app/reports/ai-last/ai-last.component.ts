import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TagReportItem } from '../tags-time/tags-time.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ai-last',
  templateUrl: './ai-last.component.html',
  styleUrls: ['./ai-last.component.css']
})
export class AiLastComponent implements OnInit {


  dataSource = new MatTableDataSource<TagReportItem>([]);
  displayedColumns: string[] = ['name','value', 'timestamp'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

    this.reportService.lastAI().subscribe({
      next: result => {
        console.log(result);
    
        if (Array.isArray(result.results)) {
          if (result.results.length === 0) {
            this.showNoResultsSnackBar();
            console.log('No tag records found.');
          } else {
            const mappedData: TagReportItem[] = result.results.map((item: any) => ({
              timestamp: new Date(item.timestamp),
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

