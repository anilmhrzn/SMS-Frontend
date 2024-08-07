import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {filter, mergeMap} from 'rxjs/operators';
// import {NgIf} from "@angular/common";
import {AuthService} from "./core/services/authService/auth.service";
import {NgIf} from "@angular/common";
import {map} from "rxjs";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faUsers, faRightFromBracket, faFilePen, faPersonChalkboard} from '@fortawesome/free-solid-svg-icons';
import {HasRoleDirective} from "./core/derectives/has-role.directive";

// <i class="fa-solid fa-right-from-bracket"></i>
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, FontAwesomeModule, HasRoleDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class AppComponent {

  title = 'app';
  showNavbar: boolean = true;
  faUsers = faUsers;
  faRightFromBracket = faRightFromBracket;
  faFilePen=faFilePen
  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected authService: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      const {showNavbar: showNavbar1} = data;
      this.showNavbar = showNavbar1 !== false; // Default to true if undefined
    });
  }

  logout() {
    this.authService.logout();
  }

  protected readonly faPersonChalkboard = faPersonChalkboard;
}
