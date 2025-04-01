import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sign-in',
  imports: [MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  public pending = signal(false);

  public signInForm = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(128)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(64)],
    ],
  });

  public signUp() {
    if (this.signInForm.invalid) {
      return;
    }
    this.pending.set(true);

    this.authService.login(this.signInForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.pending.set(false);
      },
    });
  }
}
