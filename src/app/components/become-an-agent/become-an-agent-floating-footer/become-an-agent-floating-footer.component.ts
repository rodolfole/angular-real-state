import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../container/container.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-become-an-agent-floating-footer',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './become-an-agent-floating-footer.component.html',
  styleUrls: ['./become-an-agent-floating-footer.component.css']
})
export class BecomeAnAgentFloatingFooterComponent {

  stepsRoutes = [
    'about-your-home',
    'structure',
    'location',
    'features',
    'stand-out',
    'amenities',
    'photos',
    'title',
    'description',
    'finish-setup',
    'price',
    'receipt',
    'publish'
  ]

  currentRoute: string = "";

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url.split('become-an-agent/')[1] || 'about-your-home';
      }
    });
  }

  handleStep(isNext: boolean) {
    const currentRouteIndex = this.stepsRoutes.findIndex(elem => elem === this.currentRoute);
    const stepRoute = isNext ? this.stepsRoutes[currentRouteIndex + 1] : this.stepsRoutes[currentRouteIndex + -1];
    this.router.navigate([`/become-an-agent/${stepRoute}`]);
  }

}
