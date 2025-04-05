import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DocumentsStore } from '../../store/documents.state';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { MatCard, MatCardActions, MatCardTitle } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { AppSection } from '../../../../shared/models/enums/app-section.enum';
import { Router } from '@angular/router';
import { DocumentStatus } from '../../store/document';
import { MatIcon } from '@angular/material/icon';

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { RequiredErrorPipe } from '../../../../shared/pipes/required-error.pipe';
import { MaxLengthErrorPipe } from '../../../../shared/pipes/max-length-error.pipe';

@Component({
  selector: 'app-document-create',
  imports: [
    FilePondModule,
    FormsModule,
    MatCard,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButton,
    BackButtonComponent,
    MatCardTitle,
    MatCardActions,
    MatIcon,
    RequiredErrorPipe,
    MaxLengthErrorPipe,
  ],
  templateUrl: './document-create.component.html',
  styleUrl: './document-create.component.scss',
})
export class DocumentCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private documentsStore = inject(DocumentsStore);
  private acceptedFileTypes = ['application/pdf'];

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(64)]],
    file: [<File | undefined>undefined, [Validators.required]],
  });

  public pondOptions = {
    multiple: false,
    labelIdle: 'Drop file here',
    acceptedFileTypes: this.acceptedFileTypes,
  };

  constructor() {
    registerPlugin(FilePondPluginFileValidateType);

    effect(() => {
      if (this.documentsStore.updating()) {
        this.toDocumentsList();
      }
    });
  }

  public pondHandleAddFile(event: { file: { file: File } }) {
    if (!this.acceptedFileTypes.includes(event.file.file.type)) {
      return;
    }
    this.form.patchValue({ file: event.file.file });
  }

  public pondHandleRemoveFile() {
    this.form.patchValue({ file: undefined });
  }

  public create(send: boolean) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value as any;
    this.documentsStore.createDocument({
      name: formValue.name,
      status: send ? DocumentStatus.READY_FOR_REVIEW : DocumentStatus.DRAFT,
      file: formValue.file,
    });
  }

  public toDocumentsList() {
    this.router.navigate([AppSection.DOCUMENTS]);
  }
}
