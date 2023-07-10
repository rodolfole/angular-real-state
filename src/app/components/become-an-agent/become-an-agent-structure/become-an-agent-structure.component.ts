import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, categories } from 'src/app/mocks/categories';
import { CategoryBoxComponent } from '../../category-box/category-box.component';

@Component({
  selector: 'app-become-an-agent-structure',
  standalone: true,
  imports: [CommonModule, CategoryBoxComponent],
  templateUrl: './become-an-agent-structure.component.html',
  styleUrls: ['./become-an-agent-structure.component.css']
})
export class BecomeAnAgentStructureComponent {

  @Input() categories: Category[] = categories;

}
