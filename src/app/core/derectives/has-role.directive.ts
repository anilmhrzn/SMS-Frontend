import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/authService/auth.service";

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  // private authService: AuthService;
  @Input()
  set appHasRole(role: string) {
    // console.log(role);
    // console.log(this.authService.hasRole(role));
    if (this.authService.hasRole(role)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) {
  }


}
