import {RouterModule, Routes} from '@angular/router';
import {MyfirstcomponentComponent} from "./myfirstcomponent/myfirstcomponent.component";
import {RemaningComponent} from "./components/remaning/remaning.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {StudentComponent} from "./components/students/student/student.component";
import {AddstudentComponent} from "./components/students/addstudent/addstudent.component";
import {StudentOfUserComponent} from "./components/students/student-of-user/student-of-user.component";
import {ExamsComponent} from "./components/exams/exams/exams.component";

export const routes: Routes = [
  {path: 'students', component: StudentComponent,canActivate: [AuthGuard]},
  {path: 'students-of-user', component: StudentOfUserComponent,canActivate: [AuthGuard]},
  {path: 'students/add', component: AddstudentComponent,canActivate: [AuthGuard]},
  {path: 'remaining', component: RemaningComponent},
  {path: 'myfirstcomponent', component: MyfirstcomponentComponent},
  {path: 'login', component: LoginComponent},
  {path:'exams',component:ExamsComponent,canActivate: [AuthGuard]},
  {path: '', redirectTo:'/login', pathMatch: "full"}
];

