import { Component, inject, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DocumentsStore } from '../documents/store/documents.state';
import { MatButton } from '@angular/material/button';
import { FilePondModule } from 'ngx-filepond';

@Component({
  selector: 'app-document-detail',
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    FilePondModule,
  ],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss',
})
export class DocumentDetailComponent {
  private fb = inject(FormBuilder);
  private documentsStore = inject(DocumentsStore);

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

  public pondHandleAddFile(event: { file: { file: File } }) {
    this.form.patchValue({ file: event.file.file });
  }

  public create() {
    console.log('form value', this.form.value);
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
}
