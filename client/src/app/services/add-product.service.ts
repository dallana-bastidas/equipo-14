import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AddProductService {
    private apiURL = 'http://localhost:4200/api/add-product';

  constructor(private http: HttpClient) {}
}