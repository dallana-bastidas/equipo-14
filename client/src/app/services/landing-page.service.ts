import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LandingPageService {
    private apiURL = 'http://localhost:4200/api/landing-page';

    constructor(private http: HttpClient) {}

  }