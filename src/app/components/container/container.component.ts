import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  @Input() children: TemplateRef<any> | null = null;

}
