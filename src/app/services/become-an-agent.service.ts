import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface FormValidity {
  formGroupRef: FormGroup;
  stepRoute: string;
}

@Injectable({
  providedIn: 'root'
})
export class BecomeAnAgentService {

  public emitFilterCategory: EventEmitter<FormValidity> = new EventEmitter();

  constructor() { }

}
