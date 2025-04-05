import { Component, inject } from '@angular/core';
import { DocumentsStore } from '../../store/documents.state';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppSection } from '../../../../shared/models/enums/app-section.enum';
import { DocumentsListComponent } from '../../components/documents-list/documents-list.component';
import { DocumentsFiltersComponent } from '../../components/documents-filters/documents-filters.component';
import { DocumentFilters } from '../../models/document-filters.interface';
import { IsGrantedDirective } from '../../../../core/auth/directives/is-granted.directive';
import { UserRole } from '../../../../core/auth/models/user-role.enum';
import { DOCUMENTS_COLUMNS } from './documents.providers';
import { DocumentStatus } from '../../store/document';

@Component({
  selector: 'app-documents',
  imports: [
    MatButton,
    MatIcon,
    DocumentsListComponent,
    DocumentsFiltersComponent,
    IsGrantedDirective,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  private router = inject(Router);
  private store = inject(DocumentsStore);

  public Roles = UserRole;
  public columns = inject(DOCUMENTS_COLUMNS);
  public items = this.store.items;
  public count = this.store.count;
  public filters = this.store.filters;
  public loading = this.store.loading;

  public toCreateDocument() {
    this.router.navigate([`${AppSection.DOCUMENTS}/create`]);
  }

  public toViewDocument(id: string) {
    this.router.navigate([`${AppSection.DOCUMENTS}/edit/${id}`]);
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

  public changeDocumentStatus(data: { id: string; status: DocumentStatus }) {
    this.store.changeDocumentStatus({ ...data });
  }

  public deleteDocument(id: string) {
    return this.store.deleteDocument(id);
  }
}
