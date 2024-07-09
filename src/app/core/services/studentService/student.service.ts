import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getStudents(page: number = 0, limit: number = 10): Observable<StudentList> {
    const token = localStorage.getItem('auth_token'); // Retrieve the token
    const headers = { 'Authorization': `Bearer ${token}` }; // Prepare the headers
    const queryParams = `?page=${page}&limit=${limit}`;
    return this.http.get<StudentList>(`${this.apiUrl}/students${queryParams}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getStudentsOfUser(page: number = 0, limit: number = 10): Observable<StudentList> {
    const token = localStorage.getItem('auth_token'); // Retrieve the token
    const headers = { 'Authorization': `Bearer ${token}` }; // Prepare the headers
    const queryParams = `?page=${page}&limit=${limit}`;
    return this.http.get<StudentList>(`${this.apiUrl}/student-of-user${queryParams}`, { headers })
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
