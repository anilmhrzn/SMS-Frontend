import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CsvDownloadService {
  constructor(private http: HttpClient) {}
  downloadCSV(examId: number): Observable<Blob> {
  console.log(`Requesting CSV for examId: ${examId}`);const token = localStorage.getItem('auth_token');
    const headers = {'Authorization': `${token}`};

  return this.http.get<Blob>(`http://localhost:8080/api/exam/students?examId=${examId}`, {
    headers: headers,
    responseType: 'blob' as 'json'
  }).pipe(
    tap({
      next: (blob) => console.log(`Received blob of size: ${blob.size}`),
      error: (error) => console.error(`Error downloading CSV: ${error}`)
    })
  );
}
}
