import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { ContainerComponent } from '../../container/container.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-become-an-agent-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ContainerComponent,
    RouterModule
  ],
  templateUrl: './become-an-agent-navbar.component.html',
  styleUrls: ['./become-an-agent-navbar.component.css']
})
export class BecomeAnAgentNavbarComponent {

  @ViewChild('navbar', { static: false }) navbar?: ElementRef<HTMLElement>;

  isScrolling: boolean = false;

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
