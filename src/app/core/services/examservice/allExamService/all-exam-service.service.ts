import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
// import {Student, StudentList} from "../../studentService/student.service";


@Injectable({
  providedIn: 'root'
})
export class AllExamServiceService {
  private apiUrl = 'http://localhost:8080/api';


  constructor(private http: HttpClient) {
  }

  getExams(): Observable<ExamList[]> {
    // const token = localStorage.getItem('auth_token'); // Retrieve the token
    // const headers = { 'Authorization': `Bearer ${token}` }; // Prepare the headers
    // const queryParams = `;
    return this.http.get<ExamList[]>(`${this.apiUrl}/exams`)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

export interface ExamList {
  id: number;
  date: Date;
  semester  : string;
  name: string;
}
