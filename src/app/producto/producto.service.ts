import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl: string = environment.baseUrl + 'productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
   return this.http.get<Producto[]>(this.apiUrl);
 }
  
}
