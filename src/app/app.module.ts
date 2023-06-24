import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalsModule } from './modals/modals.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListingsComponent } from './pages/listings/listings.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent, ListingsComponent],
  imports: [
    BrowserModule,
     AppRoutingModule, 
     ModalsModule, 
     ComponentsModule,
     HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
