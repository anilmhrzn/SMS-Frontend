import {Injectable} from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/login'; // Adjust this URL to your Symfony API

  constructor(private http: HttpClient, private router: Router) {

  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.authUrl, {email, password}, {headers, observe: 'response'})
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
    this.router.navigate(['/login']).then();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  getUser() {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['/login']).then();
      return null;
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  isLoggedIn() {
    if (this.getToken()) {
      return true;
    } else {
      return false
    }
  }
  hasRole(role: string) {
    return this.getUser().roles.includes(role);
  }
}
