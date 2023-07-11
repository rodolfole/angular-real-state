import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../navbar/search/search.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-become-an-agent-location',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './become-an-agent-location.component.html',
  styleUrls: ['./become-an-agent-location.component.css']
})
export class BecomeAnAgentLocationComponent {

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private becomeAnAgentService: BecomeAnAgentService) {
    // this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'location' });
  }

  // initForm(): FormGroup {
  //   return this.formBuilder.group({
  //     roomCount: [
  //       {
  //         value: 1,
  //         disabled: false
  //       },
  //       Validators.required
  //     ],
  //     bathroomCount: [
  //       {
  //         value: 1,
  //         disabled: false
  //       },
  //       Validators.required
  //     ],
  //   });
  // }

}
