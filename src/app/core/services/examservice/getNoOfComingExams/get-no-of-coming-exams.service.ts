import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetNoOfComingExamsService {

  constructor(private http:HttpClient) { }
  getNoOfComingExamsService(){
    const token = localStorage.getItem('auth_token'); // Retrieve the token
    const headers = { 'Authorization': `Bearer ${token}` }; // Prepare the headers
    return this.http.get<getNoOfComingExamsResponse>("http://localhost:8080/api/exams/getNoOfComingExams");
  }
}
export interface getNoOfComingExamsResponse{
  noOfComingExams:number;
}
