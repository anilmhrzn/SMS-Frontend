import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoOfFailedStudentsInLatestExamService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }
  getNoOfFailedStudentsInLatestExam(){
    const token = localStorage.getItem('auth_token');
    // const headers= {
    const headers = {'Authorization': `${token}`}; // Prepare the headers with the token

    return this.http.get<getNoOfFailedStudentsInLatestExamResponse>(`${this.apiUrl}/exam/latest/no-of-failed-students`,  {headers});
  }
}
export interface getNoOfFailedStudentsInLatestExamResponse {
  failed_students_count: number;
  subject: string;
}
