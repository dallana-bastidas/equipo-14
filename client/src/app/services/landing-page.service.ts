// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })

// export class LandingPageService {
//     private apiURL = 'http://localhost:4200/api/landing-page';

//     constructor(private http: HttpClient) {}

//   }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  private apiURL = `${environment.urlApi}/landing-page`;

  constructor(private http: HttpClient) {}

  // Agrega métodos para interactuar con el API de la landing page
}
