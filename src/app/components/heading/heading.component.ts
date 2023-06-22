import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {

  @Input() center?: boolean;
  @Input() subtitle?: string;
  @Input() title: string | undefined = undefined;

}
