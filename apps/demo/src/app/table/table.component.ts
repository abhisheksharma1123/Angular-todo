import { Todo } from '@abhi/api-interfaces';
import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AddtodoComponent } from '../addtodo/addtodo.component';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from '../main.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'abhi-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {
  constructor(private todoService: MainService, public dialog: MatDialog) {}

  dataSource!: MatTableDataSource<Todo>;
  displayedColumns: string[] = ['title', 'created_at', 'description', 'action'];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe(i => {
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
  markComplete(id: string, status:boolean){
    if(status){
      alert("This task has already marked as completed.")
      window.location.reload()
      return
    }
    this.todoService.markComplete(id, this.httpOptions);
  }
}
