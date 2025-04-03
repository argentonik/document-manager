import { Component, inject } from '@angular/core';
import { DocumentsStore } from '../../store/documents.state';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppSection } from '../../../../shared/models/enums/app-section.enum';
import { DocumentsListComponent } from '../../components/documents-list/documents-list.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-documents',
  imports: [MatButton, MatIcon, DocumentsListComponent, LoaderComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  private router = inject(Router);
  private store = inject(DocumentsStore);

  public items = this.store.items;
  public loading = this.store.loading;

  public toCreateDocument() {
    this.router.navigate([`${AppSection.DOCUMENT}/create`]);
  }

  public toViewDocument(id: string) {
    this.router.navigate([`${AppSection.DOCUMENT}/edit/${id}`]);
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
