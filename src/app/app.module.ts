import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalsModule } from './modals/modals.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { SafeUserPipe } from './pipes/safe-user.pipe';
import { SwiperDirective } from './directives/swiper.directive';

import { register } from 'swiper/element/bundle';
register();

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent, ListingsComponent, AgentsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalsModule,
    ComponentsModule,
    HttpClientModule,
    SafeUserPipe,
    SwiperDirective
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
