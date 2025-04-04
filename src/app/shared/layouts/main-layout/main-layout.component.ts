import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DocumentsStore } from '../../../features/documents/store/documents.state';

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
    MatDrawer,
    MatDrawerContent,
    MatListModule,
  ],
  providers: [DocumentsStore],
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
