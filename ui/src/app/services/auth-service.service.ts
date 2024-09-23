import { Injectable } from '@angular/core';
import { RegistrationForm } from '../models/registration-form';
import { LoginForm } from '../models/login-form';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private registerApiUrl = "http://localhost:8800/api/auth";
  isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private _httpClient: HttpClient) {
  }

  registerUser(registrationForm: RegistrationForm){
    return this._httpClient.post(`${this.registerApiUrl}/register`, registrationForm);
  }

  loginUser(loginForm: LoginForm): Observable<any> {
    return this._httpClient.post(
      `${this.registerApiUrl}/login`,
      loginForm,
      { withCredentials: true }
    ).pipe(
      tap((response: any) => {
        this.isLoggedIn$.next(true);
        this.loginStorage();
      })
    );
  }

  logoutUser(): Observable<any> {
    this.logoutStorage();
    this.isLoggedIn$.next(false);
    return this._httpClient.post(`${this.registerApiUrl}/logout`, {}, { withCredentials: true });
  }


  isLoggedIn(){
    return !!localStorage.getItem("auth_token");
  }

  loginStorage() {
    localStorage.setItem('auth_token', "your_auth_token_value");
  }

  logoutStorage(){
    localStorage.removeItem("auth_token");
  }
  
 
}
