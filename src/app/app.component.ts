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

  constructor(private router: Router,private authService:AuthService) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = !event.urlAfterRedirects.includes('/login');
    });
  }

  logout() {
    this.authService.logout();
  }
}
