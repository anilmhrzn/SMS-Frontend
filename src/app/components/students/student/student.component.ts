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

})
export class StudentComponent implements OnInit {
  constructor(private studentService: StudentService) { }

  students: Student[] = [];
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  errorMessage: string = '';

  showAlert: boolean = false;
  alertMessage: string = '';
  ngOnInit(): void {

    this.loadStudents(this.page, this.limit);
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

}
