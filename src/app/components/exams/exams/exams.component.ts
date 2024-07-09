import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {
  AllExamServiceService,
  ExamList
} from "../../../core/services/examservice/allExamService/all-exam-service.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent implements OnInit {
  constructor(private allExamServiceService: AllExamServiceService) {
  }

  exams: ExamList[] = [];

  ngOnInit(): void {
    this.loadExams();
  }

  private loadExams() {
    this.allExamServiceService.getExams().subscribe({
      next: (data: ExamList[]) => {
        this.exams= data;
        // console.log(this.exams);
      }
    });
  }
}
