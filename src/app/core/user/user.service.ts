import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/models/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private userResource = rxResource({
    loader: () => this.http.get<User>(`${environment.apiUrl}/user`),
  });

  public user = computed(() => this.userResource.value());
}
