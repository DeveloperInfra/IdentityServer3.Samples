import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    TitleComponent
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    TitleComponent
  ]
})
export class LayoutModule { }
