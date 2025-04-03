import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { RouteStateService } from './core/route-state/route-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LoaderComponent],
})
export class AppComponent {
  public loading = inject(RouteStateService).loading;
}
