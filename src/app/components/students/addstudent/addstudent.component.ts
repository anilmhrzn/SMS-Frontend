// addstudent.component.ts
import {Component, OnInit} from '@angular/core';
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
import {Router, RouterLink} from "@angular/router";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";

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
export class AddstudentComponent implements OnInit {
  studentForm: FormGroup;
  errorMessage: string = '';
  semesterResponse:AllSemesterResponse[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router,private getAllSemester:GetAllSemesterService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photo: ['', [Validators.required, imageFileValidator()]],
      gender: ['', Validators.required],
      semester_id:[0,Validators.min(1)],
      number: this.fb.array([this.createPhoneNumberGroup()])
    });
  }

  ngOnInit(): void {
    this.loadSemester();
    }
  loadSemester() {
    this.getAllSemester.loadAllSemester().subscribe({
      next: (data: AllSemesterResponse[]) => {
        this.semesterResponse = data;
      }
    })
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
    console.log(this.studentForm.value.semester_id)
    if (this.studentForm.valid) {
      const phoneNumbers = this.studentForm.value.number.map((phoneGroup: {
        number: string
      }) => Number(phoneGroup.number));
      const formValue = {...this.studentForm.value, number: phoneNumbers};
      this.http.post('http://localhost:8080/api/student/new',
        formValue)
        .subscribe({
          next: (response) => {
            alert('Student added successfully');
            this.router.navigate(['/students']).then();
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

