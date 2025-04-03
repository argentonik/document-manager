import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentsStore } from '../../store/documents.state';
import { FilePondModule } from 'ngx-filepond';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { AppSection } from '../../../../shared/models/enums/app-section.enum';
import { Router } from '@angular/router';
import { DOCUMENT_CREATION_STATUSES } from '../../store/document';

@Component({
  selector: 'app-document-create',
  imports: [
    FilePondModule,
    FormsModule,
    MatCard,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatButton,
    BackButtonComponent,
    MatCardTitle,
  ],
  templateUrl: './document-create.component.html',
  styleUrl: './document-create.component.scss',
})
export class DocumentCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private documentsStore = inject(DocumentsStore);

  public statuses = DOCUMENT_CREATION_STATUSES;
  public form = this.fb.group({
    name: [''],
    status: [''],
    file: [<File | undefined>undefined],
  });

  public pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'application/pdf',
  };

  constructor() {
    effect(() => {
      if (this.documentsStore.updating()) {
        this.toDocumentsList();
      }
    });
  }

  public pondHandleAddFile(event: { file: { file: File } }) {
    this.form.patchValue({ file: event.file.file });
  }

  public create() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value as any;
    this.documentsStore.createDocument({
      name: formValue.name,
      status: formValue.status,
      file: formValue.file,
    });
  }

  public toDocumentsList() {
    this.router.navigate([AppSection.DOCUMENTS]);
  }
}
