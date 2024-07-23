import {Component, OnInit} from '@angular/core';
import {CsvDownloadService} from "../../../core/services/csvService/csv-download-service.service";
import {Router, RouterLink} from "@angular/router";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {
  FileUploadService
} from "../../../core/services/fileUploadService/AddMarksFileUpload/file-upload-service.service";
import {HttpEventType} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

interface UploadResponse {
  message?: string;
  error?: any[]; // Adjust the type according to the actual structure of your error
}

@Component({
  selector: 'app-add-marks-of-specific-subject',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-marks-of-specific-subject.component.html',
  styleUrl: './add-marks-of-specific-subject.component.css'
})
export class AddMarksOfSpecificSubjectComponent implements OnInit {
  // examId: number | undefined;
  examId: number | undefined;
  subjectName: String | undefined;
  examName: String | undefined;
  date: Date | undefined;
  // private fileUploadService: any;
  uploadMessage: UploadResponse = {};

  constructor(private csvDownloadService: CsvDownloadService, private router: Router,
              private sharedService: SharedService,
              private fileUploadService: FileUploadService) {
  }

  ngOnInit() {

    this.sharedService.currentSubject.subscribe(details => {
      if (details === undefined) {
        this.router.navigate(['/exams']);
      } else {
        this.examId = details.examId;
        this.subjectName = details.subjectName;
        this.examName = details.examName;
        this.date = details.examDate;
      }
    });
  }

  submitForm(files: FileList | null): void {
    if (!files || files.length === 0) {
      alert('Please select a file.');
      return;
    }

    const file = files[0];
    if (file.type !== 'text/csv') {
      alert('The file must be a .csv file.');
      return;
    }
    if (this.examId === undefined) {
      alert('Please select a exam.');
      this.router.navigate(['/exams']);

      return;
    }
// Use FileUploadService to upload the file
    this.fileUploadService.uploadFile(this.examId, file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const responseBody = event.body as UploadResponse; // Type-casting to the interface
          this.uploadMessage = responseBody;
          console.log('Response received:', responseBody);
          console.log('Message:', responseBody.message);
          alert('Marks uploaded successfully');
          // this.
          if (responseBody.error) {
            console.log('Errors:', responseBody.error);
          }
        } else if (event.type === HttpEventType.UploadProgress) {
          // Handle upload progress
        }
      },
      error: (error) => {

        console.log('Upload failed:', error);
      }
    });
    // Proceed with your form submission logic here
    console.log('File is valid. Proceed with form submission.');
  }

  // downloadStudentsCsv(subjectId: number): void {
  //   this.csvDownloadService.downloadCSV(subjectId).subscribe(blob => {
  //     console.log(`Preparing to download CSV file...`);
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'students.csv';
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     a.remove();
  //     console.log(`CSV download should now be initiated.`);
  //   }, error => {
  //     console.error(`Failed to download CSV: ${error}`);
  //   });
  // }
}
