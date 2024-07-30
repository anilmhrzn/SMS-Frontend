import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStudents(name:string|null,semester:number|null,page: number , limit: number ): Observable<StudentList> {

    let queryParams = `?page=${page}&limit=${limit}`;
    if (name !== null && name !== '') {
      queryParams += `&name=${name}`;
    }
    if(semester !== null && semester !== 0){
      queryParams += `&semester=${semester}`;
    }
    // console.log(`${this.apiUrl}/students${queryParams}`);
    console.log('queryParams', queryParams);
    return this.http.get<StudentList>(`${this.apiUrl}/students${queryParams}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getStudentsOfUser(page: number = 0, limit: number = 10): Observable<StudentList> {
    const queryParams = `?page=${page}&limit=${limit}`;
    return this.http.get<StudentList>(`${this.apiUrl}/students${queryParams}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

export interface Student {
  id: number;
  name: string;
  email: string;
  number: number[]; // Assuming this matches the backend structure for phone numbers
}

export interface StudentList {
  students: Student[];
  total: number;
  page: number;
  limit: number;
}
