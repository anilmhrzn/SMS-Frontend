import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {
  getNoOfFailedStudentsInLatestExamResponse,
  NoOfFailedStudentsInLatestExamService
} from "../../core/services/studentService/noOfFailedStudents/noOfFailedStudentsInLatestExam/no-of-failed-students-in-latest-exam.service";
import {
  getNoOfStudentsResponse,
  ViewNoOfStudentsService
} from "../../core/services/studentService/viewNoOfStudents/view-no-of-students.service";
import {RouterLink} from "@angular/router";
import {
  getNoOfComingExamsResponse,
  GetNoOfComingExamsService
} from "../../core/services/examservice/getNoOfComingExams/get-no-of-coming-exams.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AlertService} from "../../core/services/alerts/alert-service.service";
import {HasRoleDirective} from "../../core/derectives/has-role.directive";
import {catchError, map, of} from "rxjs";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCalendarCheck, faChalkboardTeacher, faUserGraduate, faUsersSlash} from "@fortawesome/free-solid-svg-icons";
import {CountAllTeacherService} from "../../core/services/UserService/CountAllTeacherService/count-all-teacher.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf,
    HasRoleDirective,
    FaIconComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-100%)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, transform: 'translateY(-100%)'}))
      ])
    ]),


    trigger('scaleOnHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.1)' })),
      transition('normal <=> hover', animate('300ms ease-in-out'))
    ])

  ]
})
export class DashboardComponent implements OnInit {
  public noOfStudentsResponse: getNoOfStudentsResponse = {numberOfStudents: 0};
  public noOfFailedStudentsInLatestExamResponse: getNoOfFailedStudentsInLatestExamResponse = {
    failed_students_count: 0,
    subject: ''
  };
  public noOfComingExamsResponse: getNoOfComingExamsResponse = {noOfComingExams: 0};

  showAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = 'alert-danger';
  countOfTeacher: any;
  // hover: boolean = false; // Add this line
  hoverStates: { [key: string]: boolean } = {}; // Add this line

  constructor(private noOfStudentsService: ViewNoOfStudentsService,
              private noOfFailedStudentsInLatestExamService: NoOfFailedStudentsInLatestExamService,
              private getNoOfComingExamsService: GetNoOfComingExamsService,
              private alertService: AlertService,
              private countOfAllTeacherService: CountAllTeacherService
  ) {
  }

  ngOnInit(): void {
    this.loadNoOfStudents();
    // this.loadNoOfFailedStudentsInLatestExam();
    this.loadNoOfComingExams();
    this.loadTeachers();
    this.alertService.getShowAlert().subscribe(show => {
      this.alertService.getAlertMessage().subscribe(message => {
        this.alertMessage = message;
        this.alertService.getAlertColor().subscribe(color => {
          this.alertColor = color;

        })
      });
      this.showAlert = show;

      if (show) {
        setTimeout(() => this.hideAlert(), 3000); // Hide the alert after 3 seconds
      }
    });

  }

  loadNoOfStudents() {
    this.noOfStudentsService.getNofStudents().subscribe((data) => {
        this.noOfStudentsResponse = data;
      }
    )
  }

  loadTeachers() {
    this.countOfAllTeacherService.countOfAllTeachers().subscribe((data) => {

      this.countOfTeacher = data;
      console.log(this.countOfTeacher);
    })
  }

  // loadNoOfFailedStudentsInLatestExam() {
  //   this.noOfFailedStudentsInLatestExamService.getNoOfFailedStudentsInLatestExam().subscribe((data) => {
  //       this.noOfFailedStudentsInLatestExamResponse = data;
  //     }
  //   )
  // }

  loadNoOfComingExams() {
    this.getNoOfComingExamsService.getNoOfComingExamsService().subscribe((data) => {
        this.noOfComingExamsResponse = data;
      }
    )
  }

  hideAlert(): void {
    this.showAlert = false;
    this.alertService.setShowAlert(false);
    this.alertService.setAlertMessage('');
    this.alertService.getShowAlert().subscribe(show => {
    })
  }

  protected readonly faUserGraduate = faUserGraduate;
  protected readonly faUsersSlash = faUsersSlash;
  protected readonly faCalendarCheck = faCalendarCheck;
  protected readonly faChalkboardTeacher = faChalkboardTeacher;
}
