import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertMessageSource = new BehaviorSubject<string>('');
  private showAlertSource = new BehaviorSubject<boolean>(false);
  private showAlertColor = new BehaviorSubject<string>('bg-danger');

  constructor() {
  }

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

  getAlertColor() {
    return this.showAlertColor.asObservable();
  }
  setAlertColor(color: string) {
    this.showAlertColor.next(color);
  }


  clearAlert() {
    this.alertMessageSource.next('');
    this.showAlertSource.next(false);
  }
}
