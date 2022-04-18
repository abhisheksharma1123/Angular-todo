import { Todo } from '@abhi/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { tap } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AddtodoComponent } from '../addtodo/addtodo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'abhi-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  dataSource!: MatTableDataSource<Todo>;
  displayedColumns: string[] = ['title', 'created_at', 'description', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.http.get<Todo>('api/todos').pipe(tap(console.log))
    .subscribe(i => {
      this.dataSource = new MatTableDataSource<Todo>(i)
      this.dataSource.paginator = this.paginator;
    });
   }

   

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(AddtodoComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log("Dialog closed");
    });
  }
}
