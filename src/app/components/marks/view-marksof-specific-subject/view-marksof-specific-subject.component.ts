import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {
  Marks,
  ViewMarksByExamIdService
} from "../../../core/services/marks/viewMarksByExamId/view-marks-by-exam-id.service";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {HasRoleDirective} from "../../../core/derectives/has-role.directive";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";
import {HttpErrorResponse} from "@angular/common/http";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AllSubjectServiceService,
  SubjectList
} from "../../../core/services/subjectsService/allSubjectsService/all-subject-service.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";


@Component({
  selector: 'app-view-marksof-specific-subject',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    HasRoleDirective,
    FaIconComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './view-marksof-specific-subject.component.html',
  styleUrl: './view-marksof-specific-subject.component.css'
})
export class ViewMarksofSpecificSubjectComponent implements OnInit {
  examId: number | undefined;
  subjectName: string | undefined;
  examName: String | undefined;
  date: Date | undefined;
  marks: Marks[] | undefined;
  noOfFailedStudents: number = 0;
  subjects: SubjectList[] = [];


  constructor(private fb: FormBuilder,
              private allSubjects: AllSubjectServiceService,
              private viewMarksByExamIdService: ViewMarksByExamIdService,
              private getAllSemester: GetAllSemesterService,
              private sharedService: SharedService,
              private router: Router) {
    this.ViewMarksForm = this.fb.group({
      subject: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.sharedService.currentSubject.subscribe(details => {
      if (details === undefined) {
        this.router.navigate(['/exams']);
      } else {
        this.examId = details.examId;
        this.subjectName = details.subjectName;
        this.examName = details.examName;
        this.date = details.examDate;
      }
    });
    this.loadSubjects();

  }
  loadMarks(){
    this.viewMarksByExamIdService.viewMarksByExamId(this.examId,this.ViewMarksForm.value.subject).subscribe({
      next: data => {
        if (data) {
          this.marks = JSON.parse(JSON.stringify(data));
          if (this.marks) {

            const failedStudentsCount = this.marks.filter(mark => parseFloat(mark.mark_obtained.toString()) < 40).length;
            console.log(`Total number of failed students: ${failedStudentsCount}`);
            this.noOfFailedStudents = failedStudentsCount;
          }

        }

      }
      , error: (err) => {
        console.log(err);
        if (err.status == 404) {
          this.router.navigate(['/exams']);
        }
      }
    });
  }


  loadSubjects() {
    console.log(this.subjectName)
    if (this.subjectName !== undefined) {
      this.allSubjects.getSubjectOfSemester(parseInt(this.subjectName)).subscribe({
          next: (data) => {
            this.subjects = data;
            this.ViewMarksForm.patchValue({
              subject: data[0].id
            })
            console.log(this.ViewMarksForm.value.subject)
            this.loadMarks();

            console.log(data[0].id)
            console.log(data)
          }
        }
      )
    }
  }

  protected readonly faSearch = faSearch;
  ViewMarksForm: FormGroup;

  onSearchSubmit() {
this.loadMarks()
  }
}
