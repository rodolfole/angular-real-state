import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() controlName: string = "";
  @Input() value: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 50;
  @Input() readOnly: boolean = true;

  constructor() {
  }

  decrement() {
    if (this.value === this.min) return;
    this.value--;
    this.formGroupRef.controls[this.controlName].patchValue(this.value);
  }

  increment() {
    if (this.value === this.max) return;
    this.value++;
    this.formGroupRef.controls[this.controlName].patchValue(this.value);
  }
}
