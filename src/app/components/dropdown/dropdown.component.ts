import { Component, TemplateRef, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MenuPositionX } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

type MenuOption = {
  label?: string;
  icon?: string;
  isDivider?: boolean;
  click?: () => void;
}

export type MenuOptions = {
  menuItems: MenuOption[];
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent {

  @Input() menuPosition: MenuPositionX = "before";
  @Input() containerClasses: string = "w-72";
  @Input() menuTrigger: TemplateRef<any> | undefined = undefined;
  @Input() menuOptions?: MenuOptions;

}
