import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {

  private user: string;
  private apiResult: string;
  private subscription: any;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.userChangeEvent
      .subscribe(user => {
        console.info('Dashboard - Subscription update:', user);
        this.user = JSON.stringify(user, null, 4);
      });
  }

  ngOnDestroy() {
    if (this.subscription.unsubscribe()) {
      this.subscription.unsubscribe();
    }
  }

  login(): void {
    console.log('Dashboard - The user clicked Login.');
    this.authService.login();
  }

  logout(): void {
    console.log('Dashboard - The user clicked Logout.');
    this.authService.logout();
  }

  callApi(): void {
    console.log('Dashboard - The user clicked Call API.');
    this.apiService.getValues()
      .then(values => this.apiResult = JSON.stringify(values, null, 4))
      .catch(error => this.apiResult = JSON.stringify(error, null, 4));
  }

}
