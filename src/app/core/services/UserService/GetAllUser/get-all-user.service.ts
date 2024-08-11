import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetAllUserService {

  constructor(private readonly http:HttpClient) {

  }
 apiUrl = environment.apiUrl;

    getAllUsers(semester:number){
        return this.http.get<GetAllUserResponse>  (this.apiUrl+'/get-all-teacher?'+new URLSearchParams({semester:semester.toString()}));
    }
}
export interface Userdata {
  id: number;
  name: string;
  email: string;
  semester: number;
  subject:string;
  roles:[]
}
export interface GetAllUserResponse {
  data: Userdata[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
