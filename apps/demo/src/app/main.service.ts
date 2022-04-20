import { Todo } from '@abhi/api-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient){}
  getAllTodos(){
   return this.http.get<Todo>('api/todos').pipe(tap(console.log))
  }
  getTodoById(id: string | null){
    return this.http.get(`/api/todos/${id}`).pipe(tap(console.log))
  }
  deleteTodo(id : string | null){
    return this.http.delete<Todo>(`/api/todos/${id}`)
  }
  updateTodo(id: string| null, reqObj: string, httpOptions: { headers: HttpHeaders }){
    return this.http.put<Todo>(`/api/todos/${id}`,reqObj ,httpOptions)
  }
  markComplete(id: string | null, httpOptions: { headers: HttpHeaders }){
    return this.http.patch<Todo>(`/api/todos/${id}`, httpOptions).pipe(tap(console.log))
    .subscribe()
  }
}
