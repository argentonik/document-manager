import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { Document, DocumentStatus } from '../../store/document';
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
import { MatSort, MatSortHeader, SortDirection } from '@angular/material/sort';
import { DocumentReviewComponent } from '../document-review/document-review.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    MatSort,
    MatSortHeader,
    DocumentReviewComponent,
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent implements AfterViewInit {
  private destroyRef = inject(DestroyRef);

  public columns = input.required<string[]>();
  public documents = input.required<Document[]>();
  public loading = input<boolean>(false);
  public count = input<number>(0);
  public filters = model<Partial<DocumentFilters>>();

  public viewDocument = output<string>();
  public sendDocumentToReview = output<string>();
  public changeDocumentStatus = output<{
    id: string;
    status: DocumentStatus;
  }>();
  public revokeDocument = output<string>();
  public deleteDocument = output<string>();

  public sort = viewChild(MatSort);

  public sortActive = computed(() => {
    const sort = this.filters()?.sort;
    return sort ? sort.split(',')[0] : '';
  });
  public sortDirection = computed(() => {
    const sort = this.filters()?.sort;
    return (sort ? sort.split(',')[1] : 'desc') as SortDirection;
  });
  public showCreatorColumn = computed(() => {
    return this.columns().includes('creator');
  });
  public showReviewColumn = computed(() => {
    return this.columns().includes('review');
  });

  public ngAfterViewInit() {
    this.sort()
      ?.sortChange.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((sort) => {
        this.filters.set({
          ...this.filters(),
          sort: `${sort.active},${sort.direction}`,
        });
      });
  }

  public onPaginate(event: PageEvent) {
    const page = event.pageIndex + 1;
    const size = event.pageSize;

    this.filters.set({ page, size });
  }
}
