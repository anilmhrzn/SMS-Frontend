import { Component, OnInit } from '@angular/core';
import { Student, StudentService, StudentList } from "../../../core/services/studentService/student.service";
import { Router, RouterLink } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { AlertComponent } from "@coreui/angular";
import { HasRoleDirective } from "../../../core/derectives/has-role.directive";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AllSemesterResponse, GetAllSemesterService } from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";
import {AuthService} from "../../../core/services/authService/auth.service";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    AlertComponent,
    HasRoleDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  errorMessage: string = '';
  semesterResponse: AllSemesterResponse[] = [];

  StudentSearchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    semester: new FormControl(0)
  });

  constructor(private studentService: StudentService, private router: Router, private getAllSemester: GetAllSemesterService,private authService:AuthService) {}

  ngOnInit(): void {
    this.onSearchSubmit(1);
    this.loadSemester();
  }

  loadSemester() {
    this.getAllSemester.loadAllSemester().subscribe({
      next: (data: AllSemesterResponse[]) => {
        this.semesterResponse = data;
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']).then();
        }
      }
    });
  }

  studentProfile(id: number) {
    this.router.navigate([`student/${id}`]).then();
  }

  onSearchSubmit(page: number) {


    this.studentService.getStudents(this.StudentSearchForm.value.name, this.StudentSearchForm.value.semester, page, this.limit).subscribe({
      next: (data: StudentList) => {
        this.students = data.students;
        this.total = data.total;
        this.page = data.page;
        this.limit = data.limit ? this.limit : 10;
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']).then();
        }
      }
    });
  }

  protected readonly Math = Math;
}
