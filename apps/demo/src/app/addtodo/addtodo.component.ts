import { Todo } from '@abhi/api-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'abhi-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})


export class AddtodoComponent {
constructor(private http: HttpClient, public dialog: MatDialog){}
  todoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

 onSubmit(){
   const data = this.todoForm.value;
   const reqObj = JSON.stringify({...data, status: false, created_at: new Date()});
  //  Must subscribe to post request otherwise no request will be made
  this.http.post<Todo>('/api/todos',reqObj , this.httpOptions)
  .subscribe(task => console.log(task))
  this.todoForm.reset()
  this.dialog.closeAll()
  window.location.reload()
 }
 
}
