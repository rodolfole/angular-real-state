import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('navbar', { static: false }) navbar?: ElementRef<HTMLElement>;

  @Input() currentUser?: SafeUser | null = null;
  isMainPage: boolean = true;
  isValidPage: boolean = true;
  isScrolling: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        this.isMainPage = this.router.url === "/";
      }

      if (event instanceof ActivationEnd) {
        this.isValidPage = event.snapshot.data["pageNotFound"] !== true;
      }

    });
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    const navbarElement = this.navbar?.nativeElement;
    if (!navbarElement) return;

    if (window.scrollY > navbarElement.clientHeight - 160) {
      this.isScrolling = true;

    } else {
      this.isScrolling = false;
    }
  }


}
