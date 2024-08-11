import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchExamServiceService {
apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  searchExam(name: string, date: string, semester: string,page: number = 1, limit: number = 10){
    const queryParams = `?name=${name}&date=${date}&semester=${semester}&page=${page}&limit=${limit}`;
    return this.http.get(`${this.apiUrl}/search_exam${queryParams}`);
}
}
