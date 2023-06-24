import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() currentUser?: SafeUser | null = null;
  isMainPage: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        this.isMainPage = this.router.url === "/";
      }

    });
  }


}
