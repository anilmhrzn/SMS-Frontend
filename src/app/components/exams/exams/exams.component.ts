import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {
  ExamList
} from "../../../core/services/examservice/allExamService/all-exam-service.service";
import {Router, RouterLink} from "@angular/router";
import {
  AllSubjectServiceService, SubjectList
} from "../../../core/services/subjectsService/allSubjectsService/all-subject-service.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  SearchExamServiceService
} from "../../../core/services/examservice/searchExamService/search-exam-service.service";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {AlertService} from "../../../core/services/alerts/alert-service.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {HasRoleDirective} from "../../../core/derectives/has-role.directive";
import {AuthService} from "../../../core/services/authService/auth.service";
import {
  SubjectOfUserResponse,
  ViewSubjectOfUserService
} from "../../../core/services/UserService/ViewSubjectOfUserService/view-subject-of-user.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCirclePlus, faEye, faScrewdriverWrench, faSearch} from '@fortawesome/free-solid-svg-icons';
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    HasRoleDirective,
    FontAwesomeModule
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-100%)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class ExamsComponent implements OnInit {
  faEye = faEye;
  faSearch = faSearch;
  subjects: SubjectList[] = [];

  exams: ExamList[] = [];
  errorMessage: string = '';
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  ExamSearchForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = 'alert-danger';
  semesterResponse: AllSemesterResponse[] = [];


  constructor(private fb: FormBuilder,
              private allSubjects: AllSubjectServiceService,
              private searchExamServiceService: SearchExamServiceService,
              private sharedService: SharedService,
              private alertService: AlertService,
              private router: Router,
              private authService: AuthService,
              private cdr: ChangeDetectorRef,
              private viewSubjectOfUserServiceService: ViewSubjectOfUserService,
              private getAllSemester: GetAllSemesterService,
  ) {
    this.ExamSearchForm = this.fb.group({
      name: [''],
      date: [''],
      semester: ['']
    });

  }

  ngOnInit(): void {
      this.alertService.getAlertMessage().subscribe({
      next: (data) => {
        this.alertMessage = data;
        this.alertService.getShowAlert().subscribe(
          data => {
            this.showAlert = data;
            this.alertService.getAlertColor().subscribe(
              data => {
                this.alertColor = data
                setTimeout(() => {
                  this.hideAlert();
                }, 3000);
              }
            )

          });
      }
    });
    // this.loadSubjects();
    this.loadSemester()
    if (this.authService.hasRole('ROLE_USER')) {
      this.viewSubjectOfUserServiceService.subjectOfUser().subscribe({
        next: (data: SubjectOfUserResponse) => {
          this.ExamSearchForm.patchValue({
            subject: data.id
          })
          this.onSearchSubmit(this.page);
        }
      })
    } else {
      this.onSearchSubmit(this.page);
    }
  }

  loadSubjects() {
    this.allSubjects.getSubjects().subscribe({
        next: (data) => {
          this.subjects = JSON.parse(data);
        },
        error: (error) => {
          // if(error.status == '401'){
          //   // log()
          //   console.log('hello');
          // }
          // console.log('dsjklfaklsdjflsdjkflds')
          // console.log(error)
          console.log('Error fetching students:');
          this.router.navigate(['/login']).then()
          this.errorMessage = error.message;
          this.errorMessage = error;
        }
      }
    )
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

  onSearchSubmit(page: number) {
    this.page = page;
    const name = this.ExamSearchForm.get('name')?.value;
    const date = this.ExamSearchForm.get('date')?.value;
    const semester = this.ExamSearchForm.get('semester')?.value;
    this.searchExamServiceService.searchExam(name, date, semester, this.page, this.limit).subscribe({
      next: (data: any) => {
        this.exams = data.exams;
        this.total = data.total;
        this.page = data.page;
        if (this.exams.length === 0) {

          this.errorMessage = "could not find the exam by the search criteria that you have given please try again with different criteria.";
        } else {
          this.errorMessage = '';
        }
      },
      error: (error) => {
        console.log(error)
        if (error.status == '401') {
          this.alertMessage = 'Session expired. Please login to continue';
          this.showAlert = true
          setTimeout(
            () => {
              this.router.navigate(['/login']).then(r => {
                this.alertService.setAlertMessage('Please login to continue')
                this.alertService.setShowAlert(true)
              });
            }, 2000
          )
        }
        console.log(error.status)
        this.errorMessage = error;
      }
    });
  }

  goToAddMarks(examId:number,
               subjectName:string,
               examName:string,
               examDate:Date) {
    this.sharedService.changeSubject(examId, subjectName, examName, examDate);
  }

  viewMarksByExamId(examId
                      :
                      number, subjectName
                      :
                      string, examName
                      :
                      string, examDate
                      :
                      Date
  ) {
    this.sharedService.changeSubject(examId, subjectName, examName, examDate);

  }

  hideAlert()
    :
    void {
    this.showAlert = false;
  }

  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faScrewdriverWrench = faScrewdriverWrench;
}
