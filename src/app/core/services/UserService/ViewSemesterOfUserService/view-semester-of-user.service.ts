import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SubjectOfUserResponse} from "../ViewSubjectOfUserService/view-subject-of-user.service";

@Injectable({
  providedIn: 'root'
})

export class ViewSemesterOfUserService {
  apiURL: string = `${environment.apiUrl}/view-semester-of-user`;

  // constructor() { }
  constructor(private http:HttpClient) { }
  semesterOfUser(){
    return this.http.get<SemesterOfUserResponse>(this.apiURL) ;
  }
}
export  interface SemesterOfUserResponse{
  userSemesters:number
}
