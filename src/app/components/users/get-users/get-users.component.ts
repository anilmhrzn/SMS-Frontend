import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/authService/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [],
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    // console.log()
    // if(!this.authService.hasRole('ROLE_ADMIN')){
    //   Swal.fire({
    //       title: 'Access Denied',
    //       text: 'You do not have the required role to access this page',
    //       icon: 'error',
    //       confirmButtonText: 'Logout',
    //       denyButtonText: 'stay logged',
    //     }).then((result) => {
    //       console.log('User does not have the required role to access this page');
    //       if (result.isConfirmed) {
    //         // Swal.fire("Saved!", "", "success");
    //         this.router.navigate(['/login']).then();
    //
    //       } else if (result.isDenied) {
    //         this.router.navigate(['/dashboard']).then();
    //         // Swal.fire("Changes are not saved", "", "info");
    //       }
    //       // this.authService.logout();
    //     })
    // }
        throw new Error('Method not implemented.');
    }


}
