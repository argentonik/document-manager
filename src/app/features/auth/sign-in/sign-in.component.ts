import { Component, inject, signal } from '@angular/core';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AppSection } from '../../../shared/models/enums/app-section.enum';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { MatIcon } from '@angular/material/icon';
import { RequiredErrorPipe } from '../../../shared/pipes/required-error.pipe';
import { MaxLengthErrorPipe } from '../../../shared/pipes/max-length-error.pipe';
import { MinLengthErrorPipe } from '../../../shared/pipes/min-length-error.pipe';

@Component({
  selector: 'app-sign-in',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    RouterLink,
    MatIconButton,
    MatIcon,
    MatSuffix,
    RequiredErrorPipe,
    MaxLengthErrorPipe,
    MinLengthErrorPipe,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(SnackBarService);

  public pending = signal(false);
  public hidePassword = signal(true);

  public signInForm = new FormGroup({
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
  });

  public signUp() {
    if (this.signInForm.invalid) {
      return;
    }
    this.pending.set(true);

    this.authService
      .login({
        email: this.signInForm.value.email!,
        password: this.signInForm.value.password!,
      })
      .subscribe({
        next: () => {
          this.router.navigate([AppSection.MAIN]);
        },
        error: () => {
          this.pending.set(false);
          this.snackBar.error('Invalid email or password');
        },
      });
  }
}
