import {Component, OnInit} from '@angular/core';
import {StudentProfileService,StudentProfileResponse} from "../../../core/services/studentService/studentProfile/student-profile.service";
import {ActivatedRoute, Route, Router, RouterLink} from "@angular/router";
import {SharedService} from "../../../core/services/sharedService/shared-services.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  studentId: number | undefined;
  studentProfile:StudentProfileResponse | undefined;

  constructor(private router: Router, private studentProfileService: StudentProfileService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const id = data.get('id')
      if (id === null) {
        this.router.navigate(['/students']).then()
      } else {
        this.studentProfileService.loadStudentProfile(parseInt(id)).subscribe({
          next: ((data:StudentProfileResponse) => {
            console.log(data)
            this.studentProfile = data
          }),error:((error) => {
            if(error.status === 401){
            console.log(error)
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
