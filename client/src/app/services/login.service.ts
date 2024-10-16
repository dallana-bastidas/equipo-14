import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { I_usuario } from '../interface/config-interfaces';

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    private apiURL = `${environment.urlApi}/login`;

    constructor(private http: HttpClient) { }

    iniciarSesion(usuario: I_usuario) {
        return this.http.post(`${this.apiURL}/ingreso-sistema`, usuario);
    }

}
