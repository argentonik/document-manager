import { Component, computed, inject, input, output } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  DOCUMENTS_CAN_BE_REVIEWED_STATUSES,
  DOCUMENTS_REVIEWER_STATUSES,
} from '../../views/documents/documents.providers';
import { GetStatusPipe } from '../../pipes/get-status.pipe';
import { Document, DocumentStatus } from '../../store/document';

@Component({
  selector: 'app-document-review',
  imports: [MatSelect, MatOption, GetStatusPipe],
  templateUrl: './document-review.component.html',
  styleUrl: './document-review.component.scss',
})
export class DocumentReviewComponent {
  public canBeReviewedStatuses = inject(DOCUMENTS_CAN_BE_REVIEWED_STATUSES);
  public reviewerStatuses = inject(DOCUMENTS_REVIEWER_STATUSES);

  public document = input.required<Document>();

  public changeDocumentStatus = output<{
    id: string;
    status: DocumentStatus;
  }>();

  public canBeReviewed = computed(() => {
    return this.canBeReviewedStatuses.includes(this.document().status);
  });

  public statuses = computed(() => {
    if (!this.reviewerStatuses.includes(this.document().status)) {
      return [this.document().status, ...this.reviewerStatuses];
    } else {
      return this.reviewerStatuses;
    }
  });
}
