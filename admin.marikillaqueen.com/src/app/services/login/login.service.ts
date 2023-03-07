import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Res } from '../shared/models/Res';
import { LoginResponse } from '../shared/models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public doLogin(loginData: LoginData) {
    return firstValueFrom(
      this.http.post<Res<LoginResponse>>(environment.api + '/login', loginData)
    ).then((res) => {
      if (res.ok) {
        this.storeUser(res.payload);
      }
      return res;
    });
  }

  public storeUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  public destroyUser() {
    localStorage.setItem('user', 'false');
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user') || 'false');
  }

  public verify() {
    const currentUser = this.getUser();
    return Promise.resolve(!!(currentUser && currentUser.token));
  }
}

export interface LoginData {
  email: string;
  password: string;
}
