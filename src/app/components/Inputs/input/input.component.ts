import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export type InputType = "email" | "number" | "password" | "text";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() errors: any
  @Input() formatPrice?: boolean;
  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() id: string | null = null;
  @Input() label: string | null = null;
  @Input() required: boolean = false;
  @Input() type?: InputType;

}
