import { Component, input, model, output } from '@angular/core';
import { Document } from '../../store/document';
import { MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { IsDocumentRemovablePipe } from '../../pipes/is-document-removable.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { IsDocumentRevokablePipe } from '../../pipes/is-document-revokable.pipe';
import { GetStatusPipe } from '../../pipes/get-status.pipe';
import { IsDocumentReviewablePipe } from '../../pipes/is-document-reviewable.pipe';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DocumentFilters } from '../../models/document-filters.interface';

@Component({
  selector: 'app-documents-list',
  imports: [
    MatTableModule,
    MatCard,
    MatCardContent,
    DatePipe,
    MatIconButton,
    MatIcon,
    MatSelectModule,
    LoaderComponent,
    IsDocumentRemovablePipe,
    MatTooltip,
    MatButton,
    IsDocumentRevokablePipe,
    GetStatusPipe,
    IsDocumentReviewablePipe,
    MatCardTitle,
    MatPaginator,
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent {
  public displayedColumns: string[] = [
    'name',
    'status',
    'updatedAt',
    'delete',
    'view',
  ];

  public documents = input.required<Document[]>();
  public loading = input<boolean>(false);
  public count = input<number>(0);
  public filters = model<Partial<DocumentFilters>>();

  public viewDocument = output<string>();
  public sendDocumentToReview = output<string>();
  public revokeDocument = output<string>();
  public deleteDocument = output<string>();

  public onPaginate(event: PageEvent) {
    const page = event.pageIndex + 1;
    const size = event.pageSize;

    this.filters.set({ page, size });
  }
}
