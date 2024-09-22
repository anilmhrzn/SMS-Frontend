import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountAllTeacherService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  countOfAllTeachers() {
    return this.http.get(`${this.apiUrl}/count-all-teacher`);
  }

}
