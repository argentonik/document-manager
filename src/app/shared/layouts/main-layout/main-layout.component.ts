import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RouteStateService } from '../../../core/route-state/route-state.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  public loading = inject(RouteStateService).loading;
}
