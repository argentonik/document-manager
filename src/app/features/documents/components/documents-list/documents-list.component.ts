import { Component, input, output } from '@angular/core';
import { Document, DocumentStatus } from '../../../../shared/models/document';
import { MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-documents-list',
  imports: [
    MatTableModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    DatePipe,
    MatIconButton,
    MatIcon,
    MatSelectModule,
    LoaderComponent,
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent {
  public documents = input.required<Document[]>();
  public loading = input<boolean>(false);
  public displayedColumns: string[] = [
    'status',
    'name',
    'updatedAt',
    'delete',
    'view',
  ];
  public documentStatuses = Object.values(DocumentStatus);

  public viewDocument = output<string>();
  public deleteDocument = output<string>();
}
