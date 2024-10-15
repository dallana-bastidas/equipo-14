import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
    private apiURL = 'http://localhost:4200/api/login';

    constructor(private http: HttpClient) {}

  }