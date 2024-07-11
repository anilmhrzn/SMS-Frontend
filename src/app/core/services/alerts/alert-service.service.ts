// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AlertServiceService {
//
//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertMessageSource = new BehaviorSubject<string>('');
  private showAlertSource = new BehaviorSubject<boolean>(false);

  constructor() { }

  setAlertMessage(message: string) {
    console.log(`Setting alert message: ${message}`);
    this.alertMessageSource.next(message);
  }

  getAlertMessage() {
    return this.alertMessageSource.asObservable();
  }

  setShowAlert(show: boolean) {
    console.log(`Setting show message: ${show}`);
    this.showAlertSource.next(show);
  }

  getShowAlert() {
    return this.showAlertSource.asObservable();
  }

  // clearAlert() {
  //   this.alertMessageSource.next('');
  //   this.showAlertSource.next(false);
  // }
}
