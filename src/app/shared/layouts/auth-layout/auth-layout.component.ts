import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, MatCard],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
