import {Component, OnInit} from '@angular/core';
import {Student, StudentService, StudentList} from "../../../core/services/studentService/student.service";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-users-student',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './student-of-user.component.html',
  styleUrls: ['./student-of-user.component.css']
})
export class StudentOfUserComponent implements OnInit {
  students: Student[] = [];
  total: number = 0;
  page: number = 0;
  limit: number = 10;
  errorMessage: string = '';

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    console.log('helo')
    this.loadUsersStudents(this.page, this.limit);
  }

  loadUsersStudents(page: number, limit: number): void {
    this.studentService.getStudentsOfUser(page, limit).subscribe({
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
