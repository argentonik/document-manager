import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    MatToolbar,
    NgOptimizedImage,
    RouterLink,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatIcon,
    MatDrawerContainer,
    MatDrawerContent,
    MatListModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private authService = inject(AuthService);

  public user = inject(AuthService).user;

  public logout() {
    this.authService.logout();
  }
}
