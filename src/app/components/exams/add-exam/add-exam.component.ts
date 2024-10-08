import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {
  AllSubjectServiceService, SubjectList
} from "../../../core/services/subjectsService/allSubjectsService/all-subject-service.service";
import {AddExamServiceService} from "../../../core/services/examservice/addExamService/add-exam-service.service";
import {AlertService} from "../../../core/services/alerts/alert-service.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";

@Component({
  selector: 'app-add-exam',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    FontAwesomeModule
  ],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent implements OnInit {
  ExamForm: FormGroup;
  errorMessage: string = '';
  subjects: SubjectList[] = [];
  semesterResponse: AllSemesterResponse[] = [];

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private allSubjects: AllSubjectServiceService,
              private addExamService: AddExamServiceService,
              private router: Router,
              private alertService: AlertService,
              private getAllSemester: GetAllSemesterService) {
    this.ExamForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      semester: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSubjects();
    this.loadSemester();
  }
  loadSemester() {
    this.getAllSemester.loadAllSemester().subscribe({
      next: (data: AllSemesterResponse[]) => {
        this.semesterResponse = data;
        console.log(this.semesterResponse)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    });
  }


  loadSubjects() {

    this.allSubjects.getSubjects().subscribe({
        next: (data) => {
          this.subjects = JSON.parse(data);
        },
        error: (error) => {
          this.errorMessage = error;
        }
      }
    )
  }

  onSubmit() {
    console.log(this.ExamForm.value);
    console.log(this.ExamForm.value.semester)
    // return;
    if (this.ExamForm.valid) {
      this.addExamService.addExam(this.ExamForm).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/exams']).then(
            () => {
              this.alertService.setAlertMessage('Exam added successfully');
              this.alertService.setShowAlert(true);
              this.alertService.setAlertColor('alert-success');
            }
          );
        }
        // error: (error) => {
        //   this.errorMessage = error;
        // }
      });
      // // this.http.post('http://localhost:8080/exams', this.ExamForm.value).subscribe({
      // //   next: (data) => {
      // //     console.log(data);
      // //   },
      // //   error: (error) => {
      // //     this.errorMessage = error;
      // //   }
      // });
    } else {
      this.ExamForm.markAllAsTouched(); // Mark all controls as touched to show errors
      this.errorMessage = "Please fill out all the fields";
      console.log('Form is invalid');
    }
  }

  protected readonly Array = Array;
  protected readonly faCirclePlus = faCirclePlus;
}
