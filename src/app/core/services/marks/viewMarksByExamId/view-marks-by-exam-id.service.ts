import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
export interface Marks {
  student_Id: number;
  student_name: String;
  mark_obtained: String;
}
@Injectable({
  providedIn: 'root'
})
export class ViewMarksByExamIdService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  viewMarksByExamId(examId: any) {
    // api/exams/view/marks

    const token = localStorage.getItem('auth_token');
    const headers = {'Authorization': `${token}`}; // Prepare the headers with the token
    return this.http.post(`${this.apiUrl}/exams/view/marks`, {exam_id:examId}, {headers})

  }
}
