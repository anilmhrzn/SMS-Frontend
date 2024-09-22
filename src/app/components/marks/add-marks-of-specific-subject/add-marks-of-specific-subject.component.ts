import {Component, OnInit} from '@angular/core';
import {CsvDownloadService} from "../../../core/services/csvService/csv-download-service.service";
import {Router, RouterLink} from "@angular/router";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {
  FileUploadService
} from "../../../core/services/fileUploadService/AddMarksFileUpload/file-upload-service.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {saveAs} from 'file-saver';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";
import Swal from "sweetalert2";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {faDownload, faFile, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";
import {
  AllSubjectServiceService, SubjectList
} from "../../../core/services/subjectsService/allSubjectsService/all-subject-service.service";
import {catchError, Observable} from "rxjs";

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
    NgForOf,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-marks-of-specific-subject.component.html',
  styleUrl: './add-marks-of-specific-subject.component.css'
})
export class AddMarksOfSpecificSubjectComponent implements OnInit {
  faDownload = faDownload;
  data = [
    {StudentID: 1, Marks: 55},
  ];

  examId: number | undefined;
  subjectName: string | undefined;
  examName: String | undefined;
  date: Date | undefined;
  uploadMessage: UploadResponse = {};
  errorMessage: string | null = null;
  MarkForm: FormGroup;

  subjects: SubjectList[] = [];


  constructor(private fb: FormBuilder,
              private csvDownloadService: CsvDownloadService, private router: Router,
              private sharedService: SharedService,
              private allSubjects: AllSubjectServiceService,
              private fileUploadService: FileUploadService,
              private snackbar: MatSnackBar,
              private getAllSemester: GetAllSemesterService,
              private http: HttpClient) {
    this.MarkForm = this.fb.group({
      subject: ['', Validators.required],
    });
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
    this.loadSubjects()
  }

  submitForm(files: FileList | null): void {
    if (this.MarkForm.invalid) {
      this.MarkForm.markAllAsTouched(); // Mark all controls as touched to show errors

      // alert('invalid')
      return;
    }
    if (!files || files.length === 0) {
      this.snackbar.open('Please select a file.', 'Close', {duration: 2000});
      return;
    }

    const file = files[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      this.snackbar.open('Please upload a valid CSV file.', 'Close', {duration: 2000});

      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      this.validateCSV(content, file);
    };
    reader.readAsText(file);
  }

  loadSubjects() {
    console.log(this.subjectName)
    if (this.subjectName !== undefined) {
      this.allSubjects.getSubjectOfSemester(parseInt(this.subjectName)).subscribe({
          next: (data) => {
            this.subjects = data;
            console.log(data)
          }
        }
      )
    }
  }

  validateCSV(content: string, file: File): void {
    const lines = content.split('\n');
    console.log('lines', lines);
    if (lines.length > 0) {
      const headers = lines[0].split(',').map(header => header.trim());
      if (headers.length !== 2 || headers[0] !== 'StudentID' || headers[1] !== 'Marks') {
        // this.errorMessage = 'CSV file must have exactly two headers: StudentID and Marks.';
        this.snackbar.open('CSV file must have exactly two headers: StudentID and Marks.', 'Close');

        return;
      }

      const data = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') {
          continue;
        }
        const row = lines[i].split(',').map(value => value.trim());
        const studentID = row[0];
        const marks = row[1];
        if (!this.isInteger(studentID) || !this.isInteger(marks)) {
          // this.errorMessage = `Row ${i + 1} contains non-integer values.`;
          this.snackbar.open(`Row ${i + 1} contains non-integer values.`, 'Close', {duration: 2000});
          return;
        }

        data.push({StudentID: studentID, Marks: marks});
      }

      this.errorMessage = null;
      if (this.examId === undefined) {
        this.snackbar.open(`Please select an exam.`, 'Close', {duration: 2000});
        this.router.navigate(['/exams']);
        return;
      }
      // if(this.MarkForm.valid){
      //   // console.log(/)
      //   alert('valie')
      // }
      // if(this.MarkForm.value.subject === ''){
      //   alert('hellr')
      //   return;
      // }
      console.log(file)
      let count = 1;

      this.fileUploadService.uploadFile(this.examId,this.MarkForm.value.subject, file).subscribe(
        {
          next: response => {
            console.log('vaxa')
            if (response.type === HttpEventType.Response) {
              if (response.status === 200 && response.body) {
                this.uploadMessage = response.body;
                const errorList = this.uploadMessage.error?.map(err => `<br><span
 class="text-danger">${err.row}: ${err.reason}</span><br>`).join('') || '';

                Swal.fire({
                  title:
                    'Success',
                  html:
                    `
                    <span [ngIf]="uploadMessage.message">Valid ` + this.uploadMessage.message + `</span>
                       ` + errorList + `
                  `,
                  showCloseButton: true,
                  // 'success'
                })
              }
            }

          },
          error: error => {
            console.log('error');
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

  protected readonly faSearch = faSearch;
  protected readonly faFile = faFile;
}
