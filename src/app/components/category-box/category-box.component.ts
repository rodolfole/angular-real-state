import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent {

  @Input() icon: string | null = null;
  @Input() label: string | null = null;
  @Input() selected?: boolean;

  params: any = "";

  constructor(public router: Router) { }

  handleClick = () => {
    let currentQuery = {};

    if (this.params) {
      currentQuery = this.params.toString();
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: this.label,
    };

    if (this.params?.get("category") === this.label) {
      delete updatedQuery.category;
    }

    this.router.navigate(["/"], { queryParams: updatedQuery });
  }

}
