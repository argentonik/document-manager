import { DocumentStatus } from '../../../shared/models/document';

export interface CreateDocumentReq {
  status: DocumentStatus;
  file: File;
  name: string;
}
