export interface Document {
  id: string;
  name: string;
  status: DocumentStatus;
  fileUrl: string;
  updatedAt: string;
  createdAt: string;
}

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  REVOKE = 'REVOKE',
  READY_FOR_REVIEW = 'READY_FOR_REVIEW',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}
