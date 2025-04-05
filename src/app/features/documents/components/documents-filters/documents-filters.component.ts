import {
  Component,
  DestroyRef,
  inject,
  model,
  OnChanges,
  signal,
} from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { DocumentStatus } from '../../store/document';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DocumentFilters } from '../../models/document-filters.interface';
import { GetStatusPipe } from '../../pipes/get-status.pipe';
import { MatInput } from '@angular/material/input';
import { IsGrantedDirective } from '../../../../core/auth/directives/is-granted.directive';
import { UserRole } from '../../../../core/auth/models/user-role.enum';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-documents-filters',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    GetStatusPipe,
    MatInput,
    IsGrantedDirective,
    MatIconButton,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './documents-filters.component.html',
  styleUrl: './documents-filters.component.scss',
})
export class DocumentsFiltersComponent implements OnChanges {
  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);

  public UserRoles = UserRole;
  public statuses = Object.values(DocumentStatus);

  public filters = model<Partial<DocumentFilters>>();

  public textFilters = this.fb.group({
    creatorId: [''],
    creatorEmail: [''],
  });
  public status = signal<DocumentStatus | -1>(-1);

  constructor() {
    this.textFilters.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (filters) => {
          console.log('filters', filters);
          this.filters.set({
            ...this.filters(),
            ...filters,
            page: 1,
          });
        },
      });
  }

  public ngOnChanges() {
    this.status.set(this.filters()?.status ?? -1);

    this.textFilters.patchValue(
      {
        creatorId: this.filters()?.creatorId ?? '',
        creatorEmail: this.filters()?.creatorEmail ?? '',
      },
      { emitEvent: false },
    );
  }

  public onStatusChange(status: DocumentStatus | -1) {
    if (status === -1) {
      this.filters.set({ ...this.filters(), status: undefined, page: 1 });
    } else {
      this.filters.set({ ...this.filters(), status, page: 1 });
    }
  }
}
