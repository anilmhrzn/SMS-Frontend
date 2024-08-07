import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/authService/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  @Input()
  set appHasRole(role: string) {
    if (this.authService.hasRole(role)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else {

      // return false;
      // console.log('sdfa')
      // this.authService.logout()
      //
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService,
    private router: Router
  ) {
  }


}
