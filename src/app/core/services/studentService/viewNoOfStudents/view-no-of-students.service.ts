import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {catchError, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewNoOfStudentsService {

  constructor(private http:HttpClient) {

  }
  getNofStudents(){
    return this.http.get<getNoOfStudentsResponse>('http://localhost:8080/api/students/total' );
  }

}
export interface getNoOfStudentsResponse {
  numberOfStudents: number;
}
