import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchExamServiceService {

  constructor(private http:HttpClient) { }
  searchExam(name: string, date: string, subject: string){
    const token = localStorage.getItem('auth_token'); // Retrieve the token
    const headers = { 'Authorization': `Bearer ${token}` }; // Prepare the headers
    return this.http.get(`http://localhost:8080/api/search_exam?name=${name}&date=${date}&subject=${subject}`, { headers });
}
}
