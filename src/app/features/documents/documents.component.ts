import { Component, inject } from '@angular/core';
import { DocumentsStore } from './store/documents.state';
import { MatCard } from '@angular/material/card';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppSection } from '../../shared/models/enums/app-section.enum';

@Component({
  selector: 'app-documents',
  imports: [MatCard, LoaderComponent, MatButton, MatIcon],
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
}
