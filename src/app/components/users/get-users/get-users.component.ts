import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/authService/auth.service";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {
  GetAllUserResponse,
  GetAllUserService, Userdata
} from "../../../core/services/UserService/GetAllUser/get-all-user.service";
import {faUser, faMagnifyingGlass, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HasRoleDirective} from "../../../core/derectives/has-role.directive";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Student} from "../../../core/services/studentService/student.service";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [
    FaIconComponent,
    HasRoleDirective,
    MatTooltip,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faUserPlus = faUserPlus;
  students: Student[] = [];
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  errorMessage: string = '';
  semesterResponse: AllSemesterResponse[] = [];

  TeacherSearchForm: FormGroup = new FormGroup({
    semester: new FormControl(0)
  });
  protected teachers: Userdata[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private getAllUserService: GetAllUserService,
              private getAllSemester: GetAllSemesterService) {

  }

  ngOnInit(): void {
    this.submitSearch(1)
    this.loadSemester()

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



  protected readonly faUser = faUser;

  submitSearch(page: number) {
    this.page=page;
    console.log(this.TeacherSearchForm.value.semester)
    this.getAllUserService.getAllUsers(this.TeacherSearchForm.value.semester).subscribe((data) => {
      this.teachers = data.data;
      console.log(this.teachers);

    })
  }

  protected readonly Math = Math;
}
