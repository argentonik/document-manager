import { inject, Injectable } from '@angular/core';
import { CONFIG } from '../../../core/config/config.provider';
import { HttpClient } from '@angular/common/http';
import { Document } from '../../../shared/models/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentDetailService {
  private apiUrl = inject(CONFIG).apiUrl;
  private http = inject(HttpClient);

  public getDocument(id: string) {
    return this.http.get<Document>(`${this.apiUrl}/document/${id}`);
  }
}
