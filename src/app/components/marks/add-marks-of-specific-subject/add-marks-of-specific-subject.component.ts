import {Component, OnInit} from '@angular/core';
import {CsvDownloadService} from "../../../core/services/csvService/csv-download-service.service";
import {Router, RouterLink} from "@angular/router";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {
  FileUploadService
} from "../../../core/services/fileUploadService/AddMarksFileUpload/file-upload-service.service";
import {NgForOf, NgIf} from "@angular/common";
import {saveAs} from 'file-saver';
import {MatSnackBar} from "@angular/material/snack-bar";

interface UploadResponse {
  message?: string;
  error?: any[];
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
  data = [
    {StudentID: 1, Marks: 55},
  ];
  examId: number | undefined;
  subjectName: String | undefined;
  examName: String | undefined;
  date: Date | undefined;
  uploadMessage: UploadResponse = {};
  errorMessage: string | null = null;

  constructor(private csvDownloadService: CsvDownloadService, private router: Router,
              private sharedService: SharedService,
              private fileUploadService: FileUploadService,
              private snackbar: MatSnackBar) {
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
      // this.snackbar.
      this.snackbar.open('Please select a file.', 'Close', {duration: 2000,
      panelClass: ['custom-snackbar-error']});
      return;
    }

    const file = files[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      this.errorMessage = 'Please upload a valid CSV file.';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      this.validateCSV(content, file);
    };
    reader.readAsText(file);
  }

  validateCSV(content: string, file: File): void {
    const lines = content.split('\n');
    if (lines.length > 0) {
      const headers = lines[0].split(',').map(header => header.trim());
      if (headers.length !== 2 || headers[0] !== 'StudentID' || headers[1] !== 'Marks') {
        this.errorMessage = 'CSV file must have exactly two headers: StudentID and Marks.';
        return;
      }

      const data = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(value => value.trim());
        if (row.length !== 2) {
          this.errorMessage = `Row ${i + 1} does not have exactly two columns.`;
          return;
        }

        const studentID = row[0];
        const marks = row[1];

        if (!this.isInteger(studentID) || !this.isInteger(marks)) {
          this.errorMessage = `Row ${i + 1} contains non-integer values.`;
          return;
        }

        data.push({StudentID: studentID, Marks: marks});
      }

      this.errorMessage = null;
      if (this.examId === undefined) {
        alert('Please select an exam.');
        this.router.navigate(['/exams']);
        return;
      }
      this.fileUploadService.uploadFile(this.examId, file).subscribe(
        // response => {
        //   console.log('Data successfully uploaded', response);
        // },
        // error => {
        //   this.errorMessage = `Failed to upload data: ${error.message}`;
        // }
        {
          next: response => {
            // this.uploadMessage = response;
            console.log('Data successfully uploaded', response);

          },
          error: error => {
            this.errorMessage = `Failed to upload data: ${error.message}`;
          }
        }
      );
    } else {
      this.errorMessage = 'CSV file is empty.';
    }
  }

  isInteger(value: string): boolean {
    return /^\d+$/.test(value);
  }

  convertToCSV(data: any[]): string {
    const array = [Object.keys(data[0])].concat(data);
    return array.map(row => {
      return Object.values(row).map(value => {
        return value;
      }).toString();
    }).join('\n');
  }

  downloadCSV() {
    const csvData = this.convertToCSV(this.data);
    const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});
    saveAs(blob, 'data.csv');
  }
}
