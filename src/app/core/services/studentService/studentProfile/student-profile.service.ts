import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

export interface StudentProfileResponse {
  id: number,
  name: string,
  email: string,
  number: number[],
  photo: string,
  gender: string
}

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

  loadStudentProfile(id: number | undefined) {
    if (id === undefined) {
      this.router.navigate(['/students']).then(() => {
      })
    }
    return this.http.get<StudentProfileResponse>(`${this.apiUrl}/students/${id}`);
  }
}

