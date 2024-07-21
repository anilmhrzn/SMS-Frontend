import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(examId:number,file: File) {
    const formData = new FormData();
    formData.append('csv_file', file, file.name);
    formData.append('exam_id', examId.toString());
    const token = localStorage.getItem('auth_token'); // Retrieve the token
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/add/marks/of-exam`, formData, {headers,
      reportProgress: true,
      observe: 'events',
    })
  }
}
