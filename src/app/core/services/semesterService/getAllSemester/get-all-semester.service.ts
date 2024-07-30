import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
export interface AllSemesterResponse{
  id:number,
  semester:number
}
@Injectable({
  providedIn: 'root'
})
export class GetAllSemesterService {
apiURL = environment.apiUrl+"/view-all-semester";
  constructor(private http:HttpClient) {

  }
  loadAllSemester(){
    return this.http.get<AllSemesterResponse[]>(this.apiURL);
  }
}

