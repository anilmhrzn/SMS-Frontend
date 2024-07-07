import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoapiService {
  constructor(private http: HttpClient) {
  } // Inject HttpClient
  addNewTodo(name: string, description: string) {
    let $response = this.http.post('http://localhost:8080/api/todo/new', {name: name, description: description})
    console.log($response)
    return $response;
  }
  getTodos() {
    return this.http.get('http://localhost:8080/api/todo/')
  }
  delete(id: number) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + localStorage.getItem('token')
    // });
    return this.http.delete('http://localhost:8080/api/todo/' + id)
  }
  changeStatus(id: number) {
    return this.http.post('http://localhost:8080/api/todo/change',{id:id,status:1} )
  }
  remainingTodos() {
    return this.http.get('http://localhost:8080/api/todo/remaining')
  }

}
