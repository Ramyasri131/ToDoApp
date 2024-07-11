import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpInterceptor } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { UserCredentials } from '../../../core/models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean=false;
  constructor(private httpClient: HttpClient) {
  }

  fetchAuthToken(userData: UserCredentials):Observable<string> {
    this.isAuthenticated=true;
    return this.httpClient.post("https://localhost:7221/Auth/login", userData, {
      responseType: 'text',
    })
  }

  registerUser(userData:UserCredentials){
    return this.httpClient.post("https://localhost:7221/Auth/sign-up",userData)
  }

  isAuthenticatedUser():boolean{
    this.isAuthenticated = !!localStorage.getItem("AuthToken");
    return this.isAuthenticated;
  }
}