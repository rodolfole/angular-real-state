import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/components/review/review.component';
import { listings } from 'src/app/mocks/listings';
import { ListingsService } from 'src/app/services/listings.service';
import { UserService } from 'src/app/services/user.service';
import { SafeUser } from 'src/app/types';
import { Listing } from 'src/app/types/listing';
import { A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Swiper } from 'swiper';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent {

  config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    spaceBetween: 20,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    slidesPerView: 1,
    centeredSlides: true,
    injectStyles: [`
    .swiper-pagination-bullets.swiper-pagination-horizontal {
      bottom: 30px;
    }
    .swiper-pagination-bullet {
      background: white;
    }
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next,
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
      opacity: 0.8;
    }
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next,
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
      opacity: 0.6;
    }
    `],
    breakpoints: {
      400: {
        slidesPerView: "auto",
        centeredSlides: false
      },
    }
  }

  agentId: string = "";
  agent?: SafeUser;
  listings: Listing[] = [];

  swiper: Swiper | null = null;

  reviews: Review[] = [];

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
      this.reviews = [
        {
          createdAt: "Jul, 25 2023",
          review: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut incidunt commodi similique soluta vel rem et,
          distinctio omnis, error maxime ratione eligendi corporis natus eveniet nulla quis. Dolore, eaque.`,
          user: {
            createdAt: '',
            email: '',
            emailVerified: "",
            favoriteIds: [],
            hashedPassword: "",
            id: "3",
            image: "../../../assets/images/agent.jpg",
            name: "Jaqueline",
            updatedAt: ""
          }
        },
        {
          createdAt: "May, 12 2023",
          review: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut incidunt commodi similique soluta vel rem et,
          distinctio omnis, error maxime ratione eligendi corporis natus eveniet nulla quis. Dolore, eaque.`,
          user: {
            createdAt: '',
            email: '',
            emailVerified: "",
            favoriteIds: [],
            hashedPassword: "",
            id: "3",
            image: "../../../assets/images/placeholder.jpg",
            name: "Sofia",
            updatedAt: ""
          }
        }
      ]

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
