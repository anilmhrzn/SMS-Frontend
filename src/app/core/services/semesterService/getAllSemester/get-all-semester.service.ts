import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, throwError} from "rxjs";
import {tap} from "rxjs/operators";
export interface AllSemesterResponse{
  id:number,
  semester:number
}
@Injectable({
  providedIn: 'root'
})
export class GetAllSemesterService {
apiURL = environment.apiUrl+"/view-all-semester";
  constructor(private http:HttpClient) {

  }
  loadAllSemester(){
    return this.http.get<AllSemesterResponse[]>(this.apiURL).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error:any) {
    // if (error instanceof HttpErrorResponse) {
    //   if (error.error instanceof ErrorEvent) {
    //     console.error("Error Event");
    //   } else {
    //
    //     console.log(`error status : ${error.status} ${error.statusText}`);
    //     switch (error.status) {
    //       case 401:      //login
    //         console.log("redirect to login");
    //         // this.router.navigateByUrl("/login");
    //         break;
    //       case 403:     //forbidden
    //         console.log("redirect to login 403");
    //         // this.router.navigateByUrl("/unauthorized");
    //         break;
    //     }
    //   }
    // } else {
    //   console.log("error message : ", error.status);
    //   console.error("some thing else happened");
    // }
    // return throwError(error);
//     if (error.status === 0 ) {
//       // this.router.navigate(['/login']).then();
//       console.log(`Error Status: ${error.error}`);
//     } else {
//       console.log(`Error Status: ${error.error}`);
//     }
//     console.log(error)
    if(error.status===undefined){
      return throwError(()=>'Please login the token has expired');

    }else{

      return throwError(()=>'There is a problem with the service. We are notified & working on it. Please try again later.');
    }
  }
}

