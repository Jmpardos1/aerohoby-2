import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(correo: string, password: string): Observable<any> {
  return this.http.post(environment.baseUrl + '/auth/login', { correo, password });
  }
  
}
