import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-success-dialog',
  standalone: true,
  imports: [],
  templateUrl: './login-success-dialog.component.html',
  styleUrl: './login-success-dialog.component.css'
})
export class LoginSuccessDialogComponent {

  constructor(public dialogRef: MatDialogRef<LoginSuccessDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
