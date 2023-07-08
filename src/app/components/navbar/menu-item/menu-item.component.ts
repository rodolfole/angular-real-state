import { Component, Input, TemplateRef } from '@angular/core';
import { LoginAction } from 'src/app/services/modal.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  @Input() routerLink?: string | null = null;
  @Input() label: string | null = null;
  @Input() isBold: boolean = false;
  
}
