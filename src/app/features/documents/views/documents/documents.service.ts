import { inject, Injectable } from '@angular/core';
import { CONFIG } from '../../../../core/config/config.provider';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateDocumentReq } from '../../models/create-document-req.interface';
import { Document, DocumentStatus } from '../../store/document';
import { List } from '../../models/list.interface';
import { DocumentFilters } from '../../models/document-filters.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private apiUrl = inject(CONFIG).apiUrl;
  private http = inject(HttpClient);

  public createDocument(document: CreateDocumentReq) {
    const formData = new FormData();

    formData.append('name', document.name);
    formData.append('status', document.status);
    formData.append('file', document.file);

    return this.http.post<Document>(`${this.apiUrl}/document`, formData);
  }

  public getDocuments(filters: DocumentFilters) {
    let params = new HttpParams();
    params = params.append('page', filters.page.toString());
    params = params.append('size', filters.size.toString());
    params = params.append('sort', filters.sort);
    if (filters.status) {
      params = params.append('status', filters.status);
    }
    if (filters.creatorId) {
      params = params.append('creatorId', filters.creatorId);
    }
    if (filters.creatorEmail) {
      params = params.append('creatorEmail', filters.creatorEmail);
    }

    return this.http.get<List<Document>>(`${this.apiUrl}/document`, {
      params,
    });
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
