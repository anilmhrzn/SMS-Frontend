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
import {AuthService} from "../../../core/services/authService/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faEye, faMagnifyingGlass, faTrash, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {MatTooltip} from "@angular/material/tooltip";

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
    FaIconComponent,
    MatTooltip,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faUserPlus = faUserPlus;
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

  constructor(private studentService: StudentService, private router: Router, private getAllSemester: GetAllSemesterService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.onSearchSubmit(1);
    this.loadSemester();
  }

  loadSemester() {
    this.getAllSemester.loadAllSemester().subscribe({
      next: (data: AllSemesterResponse[]) => {
        this.semesterResponse = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
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

    deleteStudent(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Deleted!',
              'Student has been deleted.',
              'success'
            );
            this.onSearchSubmit(1);
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'Student has not been deleted.',
              'error'
            ).then(r => {});
          }
        });
      }
    });

    }

  protected readonly faEye = faEye;
  protected readonly faTrash = faTrash;
}
