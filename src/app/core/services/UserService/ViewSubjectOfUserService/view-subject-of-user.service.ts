import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
export interface SubjectOfUserResponse{
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class ViewSubjectOfUserService {


  apiURL: string = `${environment.apiUrl}/find-subject-of-user`;
  // apiURL: string = `http://localhost:8080/api/find-subject-of-user`;
  constructor(private http:HttpClient) { }
  subjectOfUser(){
        return this.http.get<SubjectOfUserResponse>(this.apiURL) ;
  }

}
