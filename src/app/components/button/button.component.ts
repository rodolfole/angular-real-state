import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() label: string = "";
  @Input() onClick: (e: MouseEvent) => void = () => { };
  @Input() outline?: boolean;
  @Input() small?: boolean;

}
