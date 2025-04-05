import { Component, inject, signal } from '@angular/core';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRole } from '../../../core/auth/models/user-role.enum';
import { AppSection } from '../../../shared/models/enums/app-section.enum';
import { AuthSection } from '../../../shared/models/enums/auth-section.enum';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatOption,
    MatSelect,
    MatButton,
    ReactiveFormsModule,
    RouterLink,
    MatError,
    MatIcon,
    MatIconButton,
    MatSuffix,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(SnackBarService);

  public pending = signal(false);
  public hidePassword = signal(true);

  public signUpForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(128),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(64),
    ]),
    role: new FormControl(<UserRole>UserRole.USER, [Validators.required]),
  });

  public signUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.pending.set(true);

    this.authService
      .register({
        fullName: this.signUpForm.value.fullName!,
        email: this.signUpForm.value.email!,
        password: this.signUpForm.value.password!,
        role: this.signUpForm.value.role!,
      })
      .subscribe({
        next: () => {
          this.router.navigate([`/${AppSection.AUTH}/${AuthSection.SIGN_IN}`]);
        },
        error: (err) => {
          this.pending.set(false);
          this.snackBar.error(err.error?.message ?? 'Registration failed');
        },
      });
  }
}
