import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterResponse } from '../models/RegisterResponse';
import { AuthenticateResponse } from '../models/AuthenticateResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<RegisterResponse>('http://localhost:3000/users/register', user, {headers: headers}).pipe(res => res);
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<AuthenticateResponse>('http://localhost:3000/users/authenticate', user, {headers: headers}).pipe(res => res);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    //local storage can only store Strings and not objs
    localStorage.setItem('user', JSON.stringify(user));
    
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.user = null;
    this.authToken = null;

    localStorage.clear();
  }
}
