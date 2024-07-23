import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/services/authService/auth.service";
import {AlertComponent} from "@coreui/angular";
import {AlertService} from '../../core/services/alerts/alert-service.service';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AlertComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-100%)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private alertService: AlertService, private cdr: ChangeDetectorRef) {
  }

  showAlert: boolean = false;
  alertMessage: string = '';

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


  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(<string>this.loginForm.value.email, <string>this.loginForm.value.password).subscribe({
        next: (response: any) => {

          this.router.navigate(['dashboard']).then(r => {
            this.alertService.setAlertMessage('Login successful!');
            this.alertService.setShowAlert(true);
          });

        },
        error: (error: any) => {
          this.alertService.setAlertMessage('Login failed ! Please check your credentials.');
          this.setAlert();
        }
      });
    } else {
      this.alertService.setAlertMessage('Please fill your credentials to login.');
      this.setAlert();
    }

  }

  setAlert() {
    this.alertService.setShowAlert(true);
    this.alertService.getShowAlert().subscribe(show => {
      this.showAlert = show;
    });
    this.alertService.getAlertMessage().subscribe(message => {
      this.alertMessage = message;
    });
    setTimeout(() => {
      this.hideAlert();
    }, 3000);

  }

  hideAlert(): void {
    this.showAlert = false;
    this.cdr.detectChanges();
  }
}
