import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {

  @Input() logoSize: string = "h-10 w-10"; 
  @Input() logoColor: string = "text-brown-500"; 
}
