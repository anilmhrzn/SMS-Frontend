import {RouterModule, Routes} from '@angular/router';
import {MyfirstcomponentComponent} from "./myfirstcomponent/myfirstcomponent.component";
import {DoneComponent} from "./components/done/done.component";
import {RemaningComponent} from "./components/remaning/remaning.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {path: 'done', component: DoneComponent},
  {path: 'remaining', component: RemaningComponent},
  {path: 'myfirstcomponent', component: MyfirstcomponentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo:'/login', pathMatch: "full"}
];

