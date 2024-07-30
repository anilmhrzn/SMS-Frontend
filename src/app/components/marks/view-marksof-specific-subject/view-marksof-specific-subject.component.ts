import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {
  Marks,
  ViewMarksByExamIdService
} from "../../../core/services/marks/viewMarksByExamId/view-marks-by-exam-id.service";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {NgForOf, NgIf} from "@angular/common";
import {HasRoleDirective} from "../../../core/derectives/has-role.directive";


@Component({
  selector: 'app-view-marksof-specific-subject',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    HasRoleDirective
  ],
  templateUrl: './view-marksof-specific-subject.component.html',
  styleUrl: './view-marksof-specific-subject.component.css'
})
export class ViewMarksofSpecificSubjectComponent implements OnInit {
  examId: number | undefined;
  subjectName: String | undefined;
  examName: String | undefined;
  date: Date | undefined;
  marks: Marks[] | undefined;
noOfFailedStudents: number =0;
  constructor(private viewMarksByExamIdService: ViewMarksByExamIdService, private sharedService: SharedService, private router: Router) {

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
    this.viewMarksByExamIdService.viewMarksByExamId(this.examId).subscribe({
      next: data => {
        if (data) {
          this.marks = JSON.parse(JSON.stringify(data));
          if(this.marks){

          const failedStudentsCount = this.marks.filter(mark => parseFloat(mark.mark_obtained.toString()) < 40).length;
          console.log(`Total number of failed students: ${failedStudentsCount}`);
          this.noOfFailedStudents=failedStudentsCount;
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
}
