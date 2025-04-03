import { DocumentStatus } from '../store/document';

export interface CreateDocumentReq {
  status: DocumentStatus;
  file: File;
  name: string;
}
