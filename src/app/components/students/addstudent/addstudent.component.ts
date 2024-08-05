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
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {
  AllSemesterResponse,
  GetAllSemesterService
} from "../../../core/services/semesterService/getAllSemester/get-all-semester.service";
import Swal from "sweetalert2";
import {
  StudentProfileResponse,
  StudentProfileService
} from "../../../core/services/studentService/studentProfile/student-profile.service";

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
  id: number | undefined;
  studentForm: FormGroup;
  errorMessage: string = '';
  semesterResponse: AllSemesterResponse[] = [];
  studentProfile: StudentProfileResponse | undefined;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private getAllSemester: GetAllSemesterService, private studentProfileService: StudentProfileService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((data) => {
      const id = data.get('id')
      if (id !== null) {
        this.id=parseInt(id)
        console.log(id)
        this.studentProfileService.loadStudentProfile(parseInt(id)).subscribe({
          next: ((data: StudentProfileResponse) => {
            console.log(data)
            this.studentProfile = data
            console.log()
            this.studentForm = this.fb.group({
              name: [this.studentProfile.name, Validators.required],
              email: [this.studentProfile.email, [Validators.required, Validators.email]],
              photo: ['', [Validators.required, imageFileValidator()]],
              gender: [this.studentProfile.gender.toLowerCase(), Validators.required],
              semester_id: [this.studentProfile.id, Validators.min(1)],
              number: this.fb.array([this.createPhoneNumberGroup(this.studentProfile.number[0])])
            });
            this.studentProfile.number.forEach(() => {
              if(this.studentProfile!==undefined){

                if(this.studentProfile.number.length>1)
                  this.addPhoneNumber();
              }
            })

          }), error: ((error) => {
            if (error.status === 401) {
              console.log(error)
              this.router.navigate(['/login']).then()
            }
          })
        })
      }
    })
      this.studentForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        photo: ['', [Validators.required, imageFileValidator()]],
        gender: ['', Validators.required],
        semester_id: [0, Validators.min(1)],
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
      }, error: (error: HttpErrorResponse) => {
        Swal.fire(
          {
            title: error.message,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            timer: 1500
          }
        ).then(r => {
          this.router.navigate(['/students']).then();
        })
        // console.log(error.message)
      }
    })
  }

  createPhoneNumberGroup(number?:number): FormGroup {
    return this.fb.group({
      number: [number===undefined?'':number, [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  get number(): FormArray {
    return this.studentForm.get('number') as FormArray;
  }

  addPhoneNumber(): void {
    this.number.push(this.createPhoneNumberGroup());
  }

  removePhoneNumber(index: number): void {
    if(this.number.length>1)
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
    if(this.id!==undefined){
      console.log(this.id)
    }
    // console.log(this.studentForm.value.semester_id)
    if (this.studentForm.valid) {
      const phoneNumbers = this.studentForm.value.number.map((phoneGroup: {
        number: string
      }) => Number(phoneGroup.number));
      const formValue = {...this.studentForm.value, number: phoneNumbers};
      this.http.post('http://localhost:8080/api/student/new',
        formValue)
        .subscribe({
          next: (response) => {
            Swal.fire(
              {
                title: 'Student added successfully',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
              }
            ).then(() => {
              this.router.navigate(['/login']).then();
            })
          },
          error: (error) => {
            //
            // console.error('There was an error:', error);
            // this.errorMessage = 'Failed to add student. Please try again.';
            Swal.fire(
              {
                title: 'Student could not be added ! Please try again after some time .',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
                timer: 1500
              }
            ).then(() => {
              this.router.navigate(['/students']).then();
            })
          }
        });
    } else {

      this.studentForm.markAllAsTouched(); // Mark all controls as touched to show errors
      Swal.fire(
        {
          title: 'Please fill all required fields correctly.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          timer: 1500
        }
      )
    }
  }
}

export function imageFileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file) {
      return {requiredFile: 'Photo is required.'};
    } else if (typeof file === 'string' && !file.startsWith('data:image')) {
      return {invalidFileType: 'Only image files are allowed.'};
    }
    return null; // If the file is an image, validation passes
  };
}

