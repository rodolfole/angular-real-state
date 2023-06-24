import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateFnsModule } from 'ngx-date-fns';
import { SwiperDirective } from '../directives/swiper.directive';

import { InputComponent } from './Inputs/input/input.component';
import { ContainerComponent } from './container/container.component';
import { ListingCardComponent } from './listings/listing-card/listing-card.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { HeadingComponent } from './heading/heading.component';
import { ButtonComponent } from './button/button.component';
import { HeartButtonComponent } from './heart-button/heart-button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoComponent } from './logo/logo.component';
import { SearchComponent } from './navbar/search/search.component';
import { UserMenuComponent } from './navbar/user-menu/user-menu.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MenuItemComponent } from './navbar/menu-item/menu-item.component';
import { ToasterComponent } from './toaster/toaster.component';
import { CategoriesComponent } from './navbar/categories/categories.component';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { CategoryInputComponent } from './Inputs/category-input/category-input.component';

import { register } from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [
    InputComponent,
    ContainerComponent,
    ListingCardComponent,
    EmptyStateComponent,
    HeadingComponent,
    ButtonComponent,
    HeartButtonComponent,
    NavbarComponent,
    LogoComponent,
    SearchComponent,
    UserMenuComponent,
    AvatarComponent,
    MenuItemComponent,
    ToasterComponent,
    CategoriesComponent,
    CategoryBoxComponent,
    CategoryInputComponent
  ],
  imports: [CommonModule, RouterModule, DateFnsModule, SwiperDirective],
  exports: [
    InputComponent,
    ContainerComponent,
    ListingCardComponent,
    EmptyStateComponent,
    HeadingComponent,
    ButtonComponent,
    NavbarComponent,
    LogoComponent,
    SearchComponent,
    UserMenuComponent,
    AvatarComponent,
    MenuItemComponent,
    ToasterComponent,
    CategoriesComponent,
    CategoryBoxComponent,
    CategoryInputComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
