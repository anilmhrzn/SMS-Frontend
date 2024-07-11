import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {StudentComponent} from "./components/students/student/student.component";
import {AddstudentComponent} from "./components/students/addstudent/addstudent.component";
import {StudentOfUserComponent} from "./components/students/student-of-user/student-of-user.component";
import {ExamsComponent} from "./components/exams/exams/exams.component";
import {AddExamComponent} from "./components/exams/add-exam/add-exam.component";

export const routes: Routes = [
  {path: 'students', component: StudentComponent,canActivate: [AuthGuard]},
  {path: 'students/add', component: AddstudentComponent,canActivate: [AuthGuard]},
  {path: 'students-of-user', component: StudentOfUserComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path:'exams',component:ExamsComponent,canActivate: [AuthGuard]},
  {path:'exams/new',component:AddExamComponent,canActivate: [AuthGuard]},
  {path: '', redirectTo:'/login', pathMatch: "full"}
];

