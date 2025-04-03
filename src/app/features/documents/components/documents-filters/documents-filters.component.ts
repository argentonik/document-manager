import { Component, input, OnChanges, output, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { DocumentStatus } from '../../store/document';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DocumentFilters } from '../../models/document-filters.interface';
import { GetStatusPipe } from '../../pipes/get-status.pipe';

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
  ],
  templateUrl: './documents-filters.component.html',
  styleUrl: './documents-filters.component.scss',
})
export class DocumentsFiltersComponent implements OnChanges {
  public statuses = Object.values(DocumentStatus);

  public filters = input<Partial<DocumentFilters>>();
  public filter = output<Partial<DocumentFilters>>();

  public status = signal<DocumentStatus | -1>(-1);

  public ngOnChanges() {
    this.status.set(this.filters()?.status ?? -1);
  }

  public onStatusChange(status: DocumentStatus | -1) {
    if (status === -1) {
      this.filter.emit({ status: undefined, page: 1 });
    } else {
      this.filter.emit({ status, page: 1 });
    }
  }
}
