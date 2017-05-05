import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { UserManager, Log, User } from 'oidc-client';

const settings: any = {
  authority: 'https://localhost:44300',
  client_id: 'ng4',
  popup_redirect_uri: 'https://localhost:4200/popup.html',
  post_logout_redirect_uri: 'https://localhost:4200/index.html',

  response_type: 'id_token token',
  scope: 'openid profile email api',

  silent_redirect_uri: 'https://localhost:4200/silentrenew.html',
  accessTokenExpiringNotificationTime: 4,
  automaticSilentRenew: true,

  filterProtocolClaims: true
};

@Injectable()
export class AuthService {

  protected headers: Headers;
  protected isLoggedIn = false;
  protected user: User;
  protected userManager: UserManager = new UserManager(settings);

  public userChangeEvent: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
    // Configure oidc-client logging.
    Log.logger = console;

    // Subscribe to oidc-client events.
    this.userManager.events.addUserLoaded(user => {
      // Raised when a user session has been established (or re-established).
      console.info('AuthService - The user session has been established (or re-established).', user);
      this.user = user;
      this.isLoggedIn = true;
      this.userChangeEvent.emit(user);
    });
    this.userManager.events.addUserUnloaded(() => {
      // Raised when a user session has been terminated.
      console.info('AuthService - The user session has been terminated.');
      this.user = null;
      this.isLoggedIn = false;
      this.userChangeEvent.emit(null);
    });
    this.userManager.events.addSilentRenewError(error => {
      // Raised when the automatic silent renew has failed.
      console.error('AuthService - The automatic silent renew has failed.', error);
    });

    // First-run; initialize properties.
    this.userManager.getUser()
      .then((user) => {
        if (user) {
          this.user = user;
          this.isLoggedIn = true;
          this.userChangeEvent.emit(user);
        } else {
          this.user = null;
          this.isLoggedIn = false;
        }
      })
      .catch((err) => {
        this.user = null;
        this.isLoggedIn = false;
      });
  }

  public getAccessToken(): string {
    let token: string = (this.user) ? this.user.access_token : null;

    console.info(`AuthService - Access Token = ${token}`);

    return token;
  }

  public login(): void {
    this.userManager
      .signinPopup()
      .catch(function (error) {
        console.error('AuthService - Error while signing in:', error);
      });
  }

  public logout(): void {
    this.userManager
      .signoutRedirect()
      .catch(function (error) {
        console.error('AuthService - Error while signing out:', error);
      });
  }

}
