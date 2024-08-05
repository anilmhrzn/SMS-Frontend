import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../authService/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  getStudents(name: string | null, semester: number | null, page: number, limit: number): Observable<StudentList> {
    let queryParams = `?page=${page}&limit=${limit}`;
    if (name !== null && name !== '') {
      queryParams += `&name=${name}`;
    }
    let data = this.authService.getUser()
    if (data.roles.includes('ROLE_USER')) {
      return this.http.get<StudentList>(`${this.apiUrl}/users/students/${queryParams}&user_id=${data.id}`,)
    } else {
      if (semester !== null && semester !== 0) {
        queryParams += `&semester=${semester}`;
      }
      return this.http.get<StudentList>(`${this.apiUrl}/students${queryParams}`,)
        .pipe(
          catchError(error => this.handleError(error))
        );
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.router.navigate(['/login']).then();
    }
    return throwError(() => new Error(error.error.message));
  }
}

export interface Student {
  id: number;
  name: string;
  email: string;
  number: number[];
}

export interface StudentList {
  students: Student[];
  total: number;
  page: number;
  limit: number;
}
