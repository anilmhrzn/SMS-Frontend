import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(examId: number,subjectId:number, file: File) {
    console.log(examId,subjectId);
    const formData = new FormData();
    formData.append('csv_file', file, file.name);
    formData.append('exam_id', examId.toString());
    formData.append('subject_id', subjectId.toString());

    return this.http.post(`${this.apiUrl}/add/marks/of-exam`, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
          errorMessage = `Error: ${error.error.message}`;
        } else {
          console.error('Backend error:', error.error);
          errorMessage = `Error: ${error.error.message || error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
