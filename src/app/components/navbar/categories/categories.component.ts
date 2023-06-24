import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Category, categories } from 'src/app/mocks/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

@Input() isMainPage: boolean = true;
@Input() isScrolling: boolean = false;

  category: string = "Beach";
  categories: Category[] = categories;

}
