import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-document-detail',
  imports: [MatCard, PdfViewerComponent],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss',
})
export class DocumentDetailComponent {}
