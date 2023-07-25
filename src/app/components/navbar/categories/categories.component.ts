import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categories } from 'src/app/mocks/categories';
import { Category } from 'src/app/types/category';

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
  isDrawerOpen: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isDrawerOpen = param['drawer_open'] && JSON.parse(param['drawer_open']);
    })
  }

}
