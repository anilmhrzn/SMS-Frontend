import { Component, OnInit } from '@angular/core';
import { Student, StudentService, StudentList } from "../../../core/services/studentService/student.service";
import { RouterLink } from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { AlertService } from '../../../core/services/alerts/alert-service.service';
import {AlertComponent} from "@coreui/angular";
import {animate, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    AlertComponent,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class StudentComponent implements OnInit {
  constructor(private studentService: StudentService,private alertService: AlertService) { }

  students: Student[] = [];
  total: number = 0;
  page: number = 0;
  limit: number = 10;
  errorMessage: string = '';

  showAlert: boolean = false;
  alertMessage: string = '';
  ngOnInit(): void {
    this.alertService.getShowAlert().subscribe(show => {
      this.showAlert = show;
      if (show) {
        setTimeout(() => this.hideAlert(), 3000); // Hide the alert after 3 seconds
      }
    });
    this.alertService.getAlertMessage().subscribe(message => {
      this.alertMessage = message;
    });
    this.loadStudents(this.page, this.limit);
    // this.alertService.clearAlert();
  }

  loadStudents(page: number, limit: number): void {
    this.studentService.getStudents(page, limit).subscribe({
      next: (data: StudentList) => {
        this.students = data.students;
        this.total = data.total;
        this.page = data.page;
        this.limit = data.limit ? this.limit : 10; // Assuming 'limit' is a boolean in StudentList, adjust based on actual API
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  hideAlert(): void {
    this.showAlert = false;
  }
}
