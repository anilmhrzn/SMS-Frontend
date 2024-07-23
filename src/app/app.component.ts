import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import {NgIf} from "@angular/common";
import {AuthService} from "./core/services/authService/auth.service";

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

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Assuming '/page-not-found' is a segment in your 404 page URL
      // Adjust the condition based on your app's routing logic
      this.showNavbar = !['/login'].includes(event.urlAfterRedirects);
    });
  }

  logout() {
    this.authService.logout();
  }
}
