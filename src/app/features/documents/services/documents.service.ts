import { inject, Injectable } from '@angular/core';
import { CONFIG } from '../../../core/config/config.provider';
import { HttpClient } from '@angular/common/http';
import { CreateDocumentReq } from '../models/create-document-req.interface';
import { Document, DocumentStatus } from '../../../shared/models/document';
import { List } from '../models/list.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private apiUrl = inject(CONFIG).apiUrl;
  private http = inject(HttpClient);

  public createDocument(document: CreateDocumentReq) {
    return this.http.post<Document>(`${this.apiUrl}/document`, document);
  }

  public getDocuments() {
    return this.http.get<List<Document>>(`${this.apiUrl}/document`);
  }

  public updateDocument(id: string, data: Partial<Document>) {
    return this.http.patch<Document>(`${this.apiUrl}/document/${id}`, data);
  }

  public removeDocument(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/document/${id}`);
  }

  public sendToReview(id: string) {
    return this.http.post<void>(
      `${this.apiUrl}/document/${id}/send-to-review`,
      {},
    );
  }

  public revokeReview(id: string) {
    return this.http.post<void>(
      `${this.apiUrl}/document/${id}/revoke-review`,
      {},
    );
  }

  public changeStatus(id: string, status: DocumentStatus) {
    return this.http.post<void>(`${this.apiUrl}/document/${id}/change-status`, {
      status,
    });
  }
}
