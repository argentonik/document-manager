import { DocumentStatus } from '../store/document';

export interface DocumentFilters {
  page: number;
  size: number;
  sort: string;
  status: DocumentStatus | null;
  creatorId: string | null;
  creatorEmail: string | null;
}
