import {
  Directive,
  inject,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserRole } from '../../core/auth/models/user-role.enum';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[isGranted]',
})
export class IsGrantedDirective implements OnInit {
  private authService = inject(AuthService);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  public isGranted = input<UserRole>();

  public ngOnInit() {
    if (this.authService.user()?.role === this.isGranted()) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
