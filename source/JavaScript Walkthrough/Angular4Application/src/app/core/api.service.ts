import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthService } from '../core/auth.service';

@Injectable()
export class ApiService {

  private url: string = 'https://localhost:44313/values'; // URL to web api.

  constructor(private http: Http, private authService: AuthService) { }

  getValues(): Promise<string> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getValuesSlowly(): Promise<string> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getValues()), 2000);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('ApiService - An error occurred:', error); // For demo purposes only.
    return Promise.reject(error);
  }

}
