import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllSubjectServiceService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  getSubjects(): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Retrieve the token
    const headers = { 'Authorization': `Bearer ${token}` }; // Prepare the headers
    // const queryParams = `;
    return this.http.get<any>(`${this.apiUrl}/subjects`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error:HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      // console.log(error.error.error.status)
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error}`;
    }
    console.log(error.status)
    return throwError(() => new Error(errorMessage));
  }
}

export interface SubjectList{
  id: number;
  name: string;
}
//TODO complete this
