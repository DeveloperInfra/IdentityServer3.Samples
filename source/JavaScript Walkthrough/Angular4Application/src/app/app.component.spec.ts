import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout'

@Component({
  template: ''
})
class DummyComponent {
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DummyComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: DummyComponent
          }
        ]),
        LayoutModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
