import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {filter, mergeMap} from 'rxjs/operators';
// import {NgIf} from "@angular/common";
import {AuthService} from "./core/services/authService/auth.service";
import {NgIf} from "@angular/common";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class AppComponent {

  title = 'app';
  showNavbar: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
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
}
