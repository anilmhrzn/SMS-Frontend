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
    this.alertMessageSource.next(message);
  }

  getAlertMessage() {
    return this.alertMessageSource.asObservable();
  }

  setShowAlert(show: boolean) {
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
