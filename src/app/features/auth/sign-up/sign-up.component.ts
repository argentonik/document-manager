import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/user/models/user-role.enum';

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
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  public pending = signal(false);

  public signUpForm = this.formBuilder.group({
    fullName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(128)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(64)],
    ],
    role: [<UserRole>UserRole.USER, [Validators.required]],
  });

  public signUp() {
    // if (this.signUpForm.invalid) {
    //   return;
    // }
    this.pending.set(true);

    this.authService.register(this.signUpForm.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/sign-in']);
      },
      error: () => {
        this.pending.set(false);
      },
    });
  }
}
