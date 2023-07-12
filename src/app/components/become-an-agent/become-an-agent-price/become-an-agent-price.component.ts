import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { InputComponent } from '../../Inputs/input/input.component';

@Component({
  selector: 'app-become-an-agent-price',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './become-an-agent-price.component.html',
  styleUrls: ['./become-an-agent-price.component.css']
})
export class BecomeAnAgentPriceComponent {

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private becomeAnAgentService: BecomeAnAgentService) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'price' });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      price: [
        {
          value: 0,
          disabled: false
        },
        [Validators.required, Validators.min(50000)]
      ],
    });
  }

}
