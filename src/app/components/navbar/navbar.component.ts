import { Component, Input } from '@angular/core';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() currentUser?: SafeUser | null = null;

}
