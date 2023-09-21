import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tag-id',
  templateUrl: './tag-id.component.html',
  styleUrls: ['./tag-id.component.css']
})
export class TagIdComponent implements OnInit {

  tagId:string ="";
  dataSource = new MatTableDataSource<TagReportItem>([]);
  displayedColumns: string[] = ['name', 'type','value', 'timestamp'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  typeMap: { [key: number]: string } = {
    0: 'Analog input',
    1: 'Digital input',
    2: 'Analog output',
    3: 'Digital output'
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

    if (!this.tagId) {
      alert('Please enter a tag identifier.');
      return;
    }

    this.reportService.tagsId(this.tagId).subscribe({
      next: result => {
        console.log(result);
  
        if (Array.isArray(result.results)) {
          if (result.results.length === 0) {
            console.log('No tag records found.');
            this.showNoResultsSnackBar();
          } else {
            const mappedData: TagReportItem[] = result.results.map((item: any) => {
              const mappedItem: TagReportItem = {
                timestamp: new Date(item.timestamp),
                type: item.type,
                name: item.name,
                value: this.mapValue(item.type, item.value), 
              };
              return mappedItem;
            });
  
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

  mapValue(type: number, rawValue: number): string {
    if (type === 1 || type === 3) {
      return rawValue === 1 ? 'On' : 'Off';
    } else {
      return rawValue.toString();
    }
  }

}



export interface TagReportItem {
  timestamp: Date;
  type: number;
  name: string;
  value: number|string;
}
