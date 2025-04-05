import { Component, effect, inject, input, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentsStore } from '../../store/documents.state';
import { MatButton } from '@angular/material/button';
import { FilePondModule } from 'ngx-filepond';
import { DocumentStore } from './document-detail.state';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Router } from '@angular/router';
import { AppSection } from '../../../../shared/models/enums/app-section.enum';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { MatIcon } from '@angular/material/icon';
import { IsDocumentRevokablePipe } from '../../pipes/is-document-revokable.pipe';
import { IsDocumentReviewablePipe } from '../../pipes/is-document-reviewable.pipe';
import { IsDocumentRemovablePipe } from '../../pipes/is-document-removable.pipe';
import { GetStatusPipe } from '../../pipes/get-status.pipe';
import { PdfViewerComponent } from '../../components/pdf-viewer/pdf-viewer.component';
import { UserRole } from '../../../../core/auth/models/user-role.enum';
import { IsGrantedDirective } from '../../../../core/auth/directives/is-granted.directive';
import { DocumentReviewComponent } from '../../components/document-review/document-review.component';
import { DocumentStatus } from '../../store/document';
import { MaxLengthErrorPipe } from '../../../../shared/pipes/max-length-error.pipe';
import { RequiredErrorPipe } from '../../../../shared/pipes/required-error.pipe';

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
    BackButtonComponent,
    MatCardTitle,
    MatCardActions,
    MatIcon,
    IsDocumentRevokablePipe,
    IsDocumentReviewablePipe,
    IsDocumentRemovablePipe,
    MatCardSubtitle,
    GetStatusPipe,
    MatCardContent,
    PdfViewerComponent,
    IsGrantedDirective,
    DocumentReviewComponent,
    MatError,
    MaxLengthErrorPipe,
    RequiredErrorPipe,
  ],
  providers: [DocumentStore],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss',
})
export class DocumentDetailComponent implements OnInit {
  private router = inject(Router);
  private documentStore = inject(DocumentStore);
  private documentsStore = inject(DocumentsStore);

  public id = input<string>();

  public UserRoles = UserRole;
  public document = this.documentStore.document;
  public loading = this.documentStore.loading;

  public nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(64),
  ]);

  constructor() {
    effect(() => {
      this.nameControl.setValue(this.document()?.name ?? '');
    });

    effect(() => {
      if (this.documentsStore.updating()) {
        this.toDocumentsList();
      }
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

  public sendDocumentToReview() {
    this.documentsStore.sendDocumentOnReview(this.document()!.id);
  }

  public revokeDocument() {
    this.documentsStore.revokeDocument(this.document()!.id);
  }

  public deleteDocument() {
    return this.documentsStore.deleteDocument(this.document()!.id);
  }

  public changeStatus(data: { id: string; status: DocumentStatus }) {
    this.documentsStore.changeDocumentStatus(data);
  }

  public saveName() {
    if (this.nameControl.invalid) {
      return;
    }
    this.documentsStore.updateDocument({
      id: this.id()!,
      data: { name: this.nameControl.value! },
    });
  }
}
