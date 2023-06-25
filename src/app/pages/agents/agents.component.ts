import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listings } from 'src/app/mocks/listings';
import { ListingsService } from 'src/app/services/listings.service';
import { UserService } from 'src/app/services/user.service';
import { SafeUser } from 'src/app/types';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent {

  agentId: string = "";
  agent?: SafeUser;
  listings: Listing[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private listinsgService: ListingsService
  ) {
    this.route.params.subscribe(async (param) => {
      this.agentId = param['id'];
      this.agent = {
        createdAt: "",
        updatedAt: "",
        email: "user1@example.com",
        emailVerified: "true",
        favoriteIds: [],
        id: "1",
        image: null,
        name: "Camila Herrera",
        hashedPassword: null
      }

      this.listings = listings;
      // this.getListings();
    });
  }

  getAgentById() {
    const getAgentSub = this.userService.getAgentById(this.agentId).subscribe((agent) => {
      this.agent = agent;
      getAgentSub.unsubscribe();
    });
  }

  getListings() {
    const getListingsSub = this.listinsgService.getListings({ userId: this.agentId }).subscribe((listings) => {
      this.listings = listings;

      getListingsSub.unsubscribe();
    })
  }

}
