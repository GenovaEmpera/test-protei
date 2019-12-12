import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { FilterComponent } from './filter/filter.component';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    FilterComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
