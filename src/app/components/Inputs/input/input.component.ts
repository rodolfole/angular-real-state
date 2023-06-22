import { Component, Input } from '@angular/core';

export type InputType = "email" | "number" | "password" | "text";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() disabled?: boolean;
  @Input() errors: any
  @Input() formatPrice?: boolean;
  @Input() id: string | null = null;
  @Input() label: string | null = null;
  @Input() required?: boolean;
  @Input() type?: InputType;

}
