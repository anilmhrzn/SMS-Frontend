import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface ExamDetails {
  examId: number;
  subjectName: string;
  examName: string;
  examDate: Date;
}
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subjectSource = new BehaviorSubject<ExamDetails | undefined>(undefined);
  currentSubject = this.subjectSource.asObservable();

  constructor() { }

  changeSubject(examId:number,subjectName: string, examName: string, examDate: Date) {
    this.subjectSource.next({ examId,subjectName, examName, examDate });
  }
}


