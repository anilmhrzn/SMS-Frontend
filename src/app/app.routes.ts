import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {StudentComponent} from "./components/students/student/student.component";
import {AddstudentComponent} from "./components/students/addstudent/addstudent.component";
import {StudentOfUserComponent} from "./components/students/student-of-user/student-of-user.component";
import {ExamsComponent} from "./components/exams/exams/exams.component";
import {AddExamComponent} from "./components/exams/add-exam/add-exam.component";
import {
  AddMarksOfSpecificSubjectComponent
} from "./components/marks/add-marks-of-specific-subject/add-marks-of-specific-subject.component";
import {ViewMarksByExamIdService} from "./core/services/marks/viewMarksByExamId/view-marks-by-exam-id.service";
import {
  ViewMarksofSpecificSubjectComponent
} from "./components/marks/view-marksof-specific-subject/view-marksof-specific-subject.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'students', component: StudentComponent, canActivate: [AuthGuard]},
  {path: 'students/add', component: AddstudentComponent, canActivate: [AuthGuard]},
  {path: 'students-of-user', component: StudentOfUserComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'exams', component: ExamsComponent, canActivate: [AuthGuard]},
  {path: 'exams/new', component: AddExamComponent, canActivate: [AuthGuard]},
  {path: 'exams/marks/add', component: AddMarksOfSpecificSubjectComponent, canActivate: [AuthGuard]},
  {path: 'exams/marks/view', component: ViewMarksofSpecificSubjectComponent, canActivate: [AuthGuard]},
  {path: 'page-not-found', component: PageNotFoundComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: "full"},
  {path: '**',redirectTo: '/page-not-found'} ,
];

