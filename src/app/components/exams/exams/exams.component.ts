import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {
  AllExamServiceService,
  ExamList
} from "../../../core/services/examservice/allExamService/all-exam-service.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {RouterLink} from "@angular/router";
import {
  AllSubjectServiceService, SubjectList
} from "../../../core/services/subjectsService/allSubjectsService/all-subject-service.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  SearchExamServiceService
} from "../../../core/services/examservice/searchExamService/search-exam-service.service";

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent implements OnInit {
  subjects: SubjectList[] = [];

  exams: ExamList[] = [];
  errorMessage: string = '';
  ExamSearchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private allExamServiceService: AllExamServiceService,
              private allSubjects: AllSubjectServiceService,
              private searchExamServiceService: SearchExamServiceService
  ) {
    this.ExamSearchForm = this.fb.group({
      name: [''],
      date: [''],
      subject: ['']
    });
  }

  ngOnInit(): void {
    this.onSearchSubmit();
    this.loadSubjects();

  }

  loadSubjects() {
    this.allSubjects.getSubjects().subscribe({
        next: (data) => {
          this.subjects = JSON.parse(data);
        },
        error: (error) => {
          this.errorMessage = error;
        }
      }
    )
  }

  private loadExams() {
    this.allExamServiceService.getExams().subscribe({
      next: (data: ExamList[]) => {
        this.exams = data;
        // console.log(this.exams);
      }, error: (error) => {

      }
    });
  }

  onSearchSubmit() {
    // console.log(this.ExamSearchForm.value)

    const name = this.ExamSearchForm.get('name')?.value;
    const date = this.ExamSearchForm.get('date')?.value;
    const subject = this.ExamSearchForm.get('subject')?.value;
    console.log(name, date, subject)
    if ((name !== null && name.trim() !== '') || (date !== null && date.trim() !== '') || (subject !== null && subject.trim() !== '')) {
      console.log(this.ExamSearchForm.value);
      this.searchExamServiceService.searchExam(name, date, subject).subscribe({
        next: (data: any) => {
          this.exams = data;
          console.log(this.exams);
          if (this.exams.length === 0){

            this.errorMessage = "could not find the exam by the search criteria that you have given please try again with different criteria.";
          }else{
            this.errorMessage= '';
          }
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    } else {
      this.errorMessage= '';

      this.loadExams();

    }
  }
}
