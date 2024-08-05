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
import {animate, style, transition, trigger} from "@angular/animations";
import {AlertService} from "../../core/services/alerts/alert-service.service";
import {HasRoleDirective} from "../../core/derectives/has-role.directive";
import {catchError, map, of} from "rxjs";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf,
    HasRoleDirective
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

  constructor(private noOfStudentsService: ViewNoOfStudentsService,
              private noOfFailedStudentsInLatestExamService: NoOfFailedStudentsInLatestExamService,
              private getNoOfComingExamsService: GetNoOfComingExamsService,
              private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadNoOfStudents();
    console.log('eta pugyo')
    this.loadNoOfFailedStudentsInLatestExam();
    this.loadNoOfComingExams();
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

  loadNoOfFailedStudentsInLatestExam() {
    this.noOfFailedStudentsInLatestExamService.getNoOfFailedStudentsInLatestExam().subscribe((data) => {
        this.noOfFailedStudentsInLatestExamResponse = data;
      }
    )
  }

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
}
