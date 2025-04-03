import { Component, effect, inject, input, OnInit } from '@angular/core';
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DocumentsStore } from '../../store/documents.state';
import { MatButton } from '@angular/material/button';
import { FilePondModule } from 'ngx-filepond';
import { DocumentStore } from '../../store/document-detail.state';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Router } from '@angular/router';
import { AppSection } from '../../../../shared/models/enums/app-section.enum';

@Component({
  selector: 'app-document-detail',
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    FilePondModule,
    LoaderComponent,
    MatCardActions,
  ],
  providers: [DocumentStore],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss',
})
export class DocumentDetailComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private documentStore = inject(DocumentStore);
  private documentsStore = inject(DocumentsStore);

  public id = input<string>();
  public document = this.documentStore.document;
  public loading = this.documentStore.loading;

  public form = this.fb.group({
    name: [''],
  });

  constructor() {
    effect(() => {
      this.form.patchValue({ name: this.document()?.name });
    });
  }

  public ngOnInit() {
    const id = this.id();
    if (id) {
      this.documentStore.getDocument(id);
    }
  }

  public toDocumentsList() {
    this.router.navigate([AppSection.DOCUMENTS]);
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    this.documentsStore.updateDocument({
      id: this.id()!,
      data: { name: this.form.value.name! },
    });
  }
}
