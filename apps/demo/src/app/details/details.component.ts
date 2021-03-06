import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '@abhi/api-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MainService } from '../main.service';


@Component({
  selector: 'abhi-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private todoService: MainService,
    private route: ActivatedRoute,
              private http: HttpClient,
              private location: Location) { }
  

  task!:Todo
  id!: string | null
  // title? = this.task.title;
  // description = this.task.description;

  todoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTodo(){
     this.todoService.getTodoById(this.id).subscribe(todo => {
      this.task=todo
      // Syncing form values
      this.todoForm.patchValue({
        title: todo.title,
        description: todo.description
      })
    })
  }

  navigateBack(): void {
    this.location.back()
  }
  
onDelete(){
  this.todoService.deleteTodo(this.id).subscribe(); 
  this.location.go('')
  window.location.reload()
 
}
 onUpdate(){
   const data = this.todoForm.value;
   const reqObj = JSON.stringify({...data, status: false, created_at: new Date()});
  //  Must subscribe to post request otherwise no request will be made
  
  this.todoService.updateTodo(this.id, reqObj, this.httpOptions).subscribe(task => console.log(task))
  this.todoForm.reset()
  window.location.reload()
 }
 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTodo();
    }
    

}
