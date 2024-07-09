import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/services/authService/auth.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  )
  errorMessage: string | null = null;
  showError: boolean = false; // Flag to control visibility of the error message

  hideErrorMessage(): void {
    this.showError = false;
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(<string>this.loginForm.value.email, <string>this.loginForm.value.password).subscribe({
        next: (response:any) => {
          console.log('Login successful',response.headers.get('Authorization'));
          this.router.navigate(['students']); // Adjust the route as necessary
        },
        error: (error:any) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.showError = true; // Show the error message
          setTimeout(() => {
            this.hideErrorMessage(); // Hide the error message after 3 seconds
          }, 3000);
        }
      });
    } else {
      this.errorMessage = 'Login failed. Please check your credentials.';
      this.showError = true; // Show the error message
      setTimeout(() => {
        this.hideErrorMessage(); // Hide the error message after 3 seconds
      }, 3000);
    }

  }
}
