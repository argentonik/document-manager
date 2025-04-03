import { Component, inject } from '@angular/core';
import { DocumentsStore } from '../../store/documents.state';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppSection } from '../../../../shared/models/enums/app-section.enum';
import { DocumentsListComponent } from '../../components/documents-list/documents-list.component';
import { DocumentsFiltersComponent } from '../../components/documents-filters/documents-filters.component';
import { DocumentFilters } from '../../models/document-filters.interface';

@Component({
  selector: 'app-documents',
  imports: [
    MatButton,
    MatIcon,
    DocumentsListComponent,
    DocumentsFiltersComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  private router = inject(Router);
  private store = inject(DocumentsStore);

  public items = this.store.items;
  public count = this.store.count;
  public filters = this.store.filters;
  public loading = this.store.loading;

  public toCreateDocument() {
    this.router.navigate([`${AppSection.DOCUMENT}/create`]);
  }

  public toViewDocument(id: string) {
    this.router.navigate([`${AppSection.DOCUMENT}/edit/${id}`]);
  }

  public filterDocuments(filters: Partial<DocumentFilters> | undefined) {
    this.store.filterDocuments(filters ?? {});
  }

  public sendDocumentToReview(id: string) {
    this.store.sendDocumentOnReview(id);
  }

  public revokeDocument(id: string) {
    this.store.revokeDocument(id);
  }

  public deleteDocument(id: string) {
    return this.store.deleteDocument(id);
  }
}
