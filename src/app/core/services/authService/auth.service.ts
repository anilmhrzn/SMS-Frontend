import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/login'; // Adjust this URL to your Symfony API

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.authUrl, { email, password }, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          const token = response.headers.get('Authorization');
          if (token) {
            localStorage.setItem('auth_token', token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // validateToken(): Observable<boolean> {
  //   const token = this.getToken();
  //   if (!token) {
  //     return of(false);
  //   }
  //   const headers = new HttpHeaders({ 'Authorization': token });
  //   return this.http.get<boolean>('http://localhost:8080/api/validate-token', { headers }).pipe(
  //     map(response => true),
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) { // Unauthorized
  //         alert('Your session has expired or the token is invalid. Please log in again.');
  //       } else {
  //         alert('An error occurred while validating your session. Please try again.');
  //       }
  //       return of(false);
  //     })
  //   );
  // }

  isLoggedIn() {
    if(this.getToken()) {
    return true;
  }else{
      return false
    }
  }
}
