import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddExamServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  addExam(examForm: any) {
    return this.http.post(`${this.apiUrl}/exams/new`, examForm.value)
  }
}
