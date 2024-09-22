import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-teacher-component',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-teacher-component.component.html',
  styleUrl: './add-teacher-component.component.css'
})
export class AddTeacherComponentComponent implements OnInit {
  TeacherForm: FormGroup;
constructor(private fb: FormBuilder,
            private getAllSemester: GetAllSemesterService) {
    this.TeacherForm = this.fb.group({
      name: [''],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      semester: ['',Validators.required],
      // role: ['ROLE_TEACHER']
    });
}
  // TODO completer this

  ngOnInit(): void {
  this.loadSemester()
        // throw new Error('Method not implemented.');
    }
  semesterResponse: AllSemesterResponse[] = [];

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
  onSubmit() {

  }
}
