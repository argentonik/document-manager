import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatCard],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
