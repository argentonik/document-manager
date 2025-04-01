import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MatButton],
})
export class AppComponent {
  title = 'document-manager';
}
