import { Component } from '@angular/core';
import { Category, categories } from 'src/app/mocks/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  category: string = "Beach";
  categories: Category[] = categories;
  pathname: string = "";
  isMainPage: boolean = this.pathname === "/";

}
