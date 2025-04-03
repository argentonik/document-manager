import { Component, input, output } from '@angular/core';
import { Document } from '../../store/document';
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
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent {
  public documents = input.required<Document[]>();
  public loading = input<boolean>(false);
  public displayedColumns: string[] = [
    'name',
    'status',
    'updatedAt',
    'delete',
    'view',
  ];

  public viewDocument = output<string>();
  public sendDocumentToReview = output<string>();
  public revokeDocument = output<string>();
  public deleteDocument = output<string>();
}
