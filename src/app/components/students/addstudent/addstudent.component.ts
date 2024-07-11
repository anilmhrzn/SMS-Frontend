// addstudent.component.ts
import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors, AbstractControl
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {exitCodeFromResult} from "@angular/compiler-cli";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgClass,
    RouterLink
  ],
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent {
  studentForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photo: ['', [Validators.required, imageFileValidator()]],
      gender: ['', Validators.required],
      number: this.fb.array([this.createPhoneNumberGroup()])
    });
  }

  createPhoneNumberGroup(): FormGroup {
    return this.fb.group({
      number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  get number(): FormArray {
    return this.studentForm.get('number') as FormArray;
  }

  addPhoneNumber(): void {
    this.number.push(this.createPhoneNumberGroup());
  }

  removePhoneNumber(index: number): void {
    this.number.removeAt(index);
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.studentForm.patchValue({
          photo: e.target?.result
        });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.studentForm.valid) {
      const token = localStorage.getItem('auth_token');
      const headers = {'Authorization': `${token}`}; // Prepare the headers with the token
      const phoneNumbers = this.studentForm.value.number.map((phoneGroup: {
        number: string
      }) => Number(phoneGroup.number));
      const formValue = {...this.studentForm.value, number: phoneNumbers};
      // console.log(formValue);
      // return;
      // console.log(formValue.number);
      this.http.post('http://localhost:8080/api/student/new',
        formValue,
        {headers})
        .subscribe({
          next: (response) => {
            console.log('Student added successfully', response);
            // Handle success response
          },
          error: (error) => {
            console.error('There was an error:', error);
            this.errorMessage = 'Failed to add student. Please try again.';
          }
        });
    } else {
      this.studentForm.markAllAsTouched(); // Mark all controls as touched to show errors
      this.errorMessage = 'Please fill all required fields correctly.';

    }
  }
}

export function imageFileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file) {
      return {requiredFile: 'Photo is required.'};
    } else if (typeof file === 'string' && !file.startsWith('data:image')) {
      // Assuming the file is a Data URL, check if it's not an image
      return {invalidFileType: 'Only image files are allowed.'};
    }
    return null; // If the file is an image, validation passes
  };
}

