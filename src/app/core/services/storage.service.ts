import { Injectable } from '@angular/core';
import { User } from '@app/core';
import moment from 'moment';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('user');
  }

  saveUser(user: User): void {
    this.clean();
    const expiresAt = moment().add(user.expiresIn, 'second');
    localStorage.setItem('token', user.token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(
      'user',
      JSON.stringify({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    );

    this.isLoggedIn()
  }

  // getUser(): any {
  //   const user = window.sessionStorage.getItem(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //   return {};
  // }

  isLoggedIn() {
    console.log(this.getExpiration());
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return {};
  }

  signout() {
    this.clean();
  }
}
