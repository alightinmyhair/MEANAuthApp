import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterResponse } from '../models/RegisterResponse';
import { AuthenticateResponse } from '../models/AuthenticateResponse';
import { tokenNotExpired } from 'angular2-jwt';


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

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get<AuthenticateResponse>('http://localhost:3000/users/profile', {headers: headers}).pipe(res => res);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    //local storage can only store Strings and not objs
    localStorage.setItem('user', JSON.stringify(user));
    
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }
}
