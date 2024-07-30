import {Component, OnInit} from '@angular/core';
import {Student, StudentService, StudentList} from "../../../core/services/studentService/student.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {AlertComponent} from "@coreui/angular";
import {HasRoleDirective} from "../../../core/derectives/has-role.directive";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";

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
  constructor(private studentService: StudentService, private router: Router,private getAllSemester:GetAllSemesterService) {

  }

  students: Student[] = [];
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  errorMessage: string = '';
  semesterResponse:AllSemesterResponse[] = [];

  StudentSearchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    semester: new FormControl(0)
  });

  ngOnInit(): void {
    this.onSearchSubmit();
    this.loadSemester();

  }

  loadStudents(page: number): void {
    this.page = page;
    this.onSearchSubmit();
  }

  loadSemester() {
    this.getAllSemester.loadAllSemester().subscribe({
      next: (data: AllSemesterResponse[]) => {
        this.semesterResponse = data;
      }
    })
  }

  studentProfile(id: number) {
    this.router.navigate([`student/${id}`]).then();
  }

  onSearchSubmit() {
    // console.log(this.page,this.limit)
    console.log(this.StudentSearchForm.value.name,this.StudentSearchForm.value.semester)
// return ;
    this.studentService.getStudents(this.StudentSearchForm.value.name, this.StudentSearchForm.value.semester, this.page, this.limit).subscribe({
      next: (data: StudentList) => {
        console.log(data)
        this.students = data.students;
        this.total = data.total;
        this.page = data.page;
        this.limit = data.limit ? this.limit : 10; // Assuming 'limit' is a boolean in StudentList, adjust based on actual API
        console.log(this.page, this.total / this.limit, data.total)
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
    console.log(this.students)
    console.log(this.StudentSearchForm.value.name);
  }

  protected readonly Math = Math;
}
