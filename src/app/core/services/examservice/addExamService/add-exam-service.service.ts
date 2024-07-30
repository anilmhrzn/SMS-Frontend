import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddExamServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  addExam(examForm: any) {
    const token = localStorage.getItem('auth_token');
    const headers = {'Authorization': `${token}`}; // Prepare the headers with the token
    return this.http.post(`${this.apiUrl}/exams/new`, examForm.value, {headers});
  }
}
