import {Component, OnInit} from '@angular/core';
import {StudentProfileService,StudentProfileResponse} from "../../../core/services/studentService/studentProfile/student-profile.service";
import {ActivatedRoute, Route, Router, RouterLink} from "@angular/router";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../core/services/authService/auth.service";
import Swal from "sweetalert2";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faUserPen} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    RouterLink,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  faUserPen = faUserPen;
  studentId: number | undefined;
  studentProfile:StudentProfileResponse | undefined;
  constructor(protected authService:AuthService,private router: Router, private studentProfileService: StudentProfileService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('sdlkj')
    // Swal.showLoading()
    // Swal.fire({
    //   title: 'Loading...',
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })
    this.route.paramMap.subscribe((data) => {
      const id = data.get('id')
      if (id === null) {
        // Swal.close()
        this.router.navigate(['/students']).then()
      } else {
        // Swal.close()

        this.studentProfileService.loadStudentProfile(parseInt(id)).subscribe({
          next: ((data:StudentProfileResponse) => {
            // console.log(data)
            this.studentProfile = data
          }),error:((error) => {
            if(error.status === 401){
            // console.log(error)
            this.router.navigate(['/login']).then()}
          })
        })
      }
    })


  }
  goToEditStudent() {
    this.router.navigate([`/student/${this.studentProfile?.id}/edit`]).then()
  }
}
