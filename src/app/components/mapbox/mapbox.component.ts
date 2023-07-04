import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, ViewChild } from '@angular/core';
import { LngLatBoundsLike, LngLatLike, Marker } from 'mapbox-gl';
import { NgxMapboxGLModule, PopupComponent } from 'ngx-mapbox-gl';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListingCardComponent } from '../listings/listing-card/listing-card.component';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Listing } from 'src/app/types/listing';
import { Subscription } from 'rxjs';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  imports: [CommonModule, NgxMapboxGLModule, ReactiveFormsModule, ListingCardComponent, NgFor, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class MapboxComponent {

  @ViewChild(PopupComponent, { static: false }) popup?: PopupComponent;

  @Input() style: string = "mapbox://styles/mapbox/streets-v9";
  @Input() center: LngLatLike | undefined = [13.401200, 52.518964];
  @Input() zoom: [number] = [14];
  @Input() markers: Marker[] = [];
  @Input() listings: Listing[] = [];

  data: GeoJSON.FeatureCollection | undefined;
  form: FormGroup;
  fitBounds: LngLatBoundsLike | undefined;
  fitBoundsOptions = { padding: 40 };
  selectedListing: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> | null = null;
  selectedListingCoordinates: [number, number] = [0, 0];
  clusterProperties: object | undefined;
  $categoryEmiterSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private listinsgService: ListingsService,
  ) {
    this.form = this.fb.group({
      coordinates: [{ value: "", disabled: false }],
    });
    this.filterListingsByCategory();

  }

  ngOnInit(): void {
    this.centerMapIntoBounds();
    this.getFormatedListings();
    this.getClusterProperties();
  }

  handleOpenPopup = async (event: MouseEvent, listing: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> | null) => {

    event.stopPropagation();

    // Reset selectedListing in case that incoming listing is null or current selctedListing is not null
    if (!listing || this.selectedListing || this.popup) {
      this.selectedListingCoordinates = [0, 0];
      this.selectedListing = null;
      this.popup?.popupClose.emit();
      // Await 10 milliseconds to ensure popup is closed before open a new one
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Return if incoming listing is null 
    if (!listing) return;

    this.selectedListingCoordinates = [listing.geometry.coordinates[0], listing.geometry.coordinates[1]];
    this.selectedListing = {
      ...listing,
      properties: {
        ...listing!.properties,
        listing: this.listings.find(elem => elem.id === listing!.properties!['id']
          || elem.id === listing!.properties!['featuredListing']?.split('_')[1])
      }
    };

  }

  handleClosePopUp = () => {
    this.selectedListingCoordinates = [0, 0];
    this.selectedListing = null;
  }

  getFormatedListings(): void {

    const formatedListings: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>[] = this.listings.map(listing => ({
      type: "Feature",
      properties: {
        id: listing.id,
        price: listing.price,
        rating: listing.rating
      },
      geometry: {
        type: "Point",
        coordinates: listing.locationCoordinates
      }
    }));

    const geoJsonData: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: formatedListings
    }

    this.data = geoJsonData;
  }

  getClusterProperties(): void {

    const getFeaturedListing = ["get", "featuredListing"];
    const accumulatedListingRating = ["to-number", ["slice", ["accumulated"], 0, ["index-of", "_", ["accumulated"]]]];
    const currentListingRating = ["to-number", ["slice", getFeaturedListing, 0, ["index-of", "_", getFeaturedListing]]];
    const reduceInitialListing = ["concat", ["get", "rating"], "_", ["get", "id"], "_", ["get", "price"]];

    this.clusterProperties = {
      featuredListing: [
        [
          "case",
          [">=", accumulatedListingRating, currentListingRating],
          ["accumulated"],
          getFeaturedListing,

        ],
        reduceInitialListing
      ],
    };
  }

  getSWCoordinates(coordinatesCollection: number[][]): LngLatLike {
    const lowestLng = Math.min(
      ...coordinatesCollection.map((coordinates) => coordinates[0])
    );
    const lowestLat = Math.min(
      ...coordinatesCollection.map((coordinates) => coordinates[1])
    );

    return [lowestLng, lowestLat];
  }

  getNECoordinates(coordinatesCollection: number[][]): LngLatLike {
    const highestLng = Math.max(
      ...coordinatesCollection.map((coordinates) => coordinates[0])
    );
    const highestLat = Math.max(
      ...coordinatesCollection.map((coordinates) => coordinates[1])
    );

    return [highestLng, highestLat];
  }

  calcBoundsFromCoordinates(coordinatesCollection: number[][]): [LngLatLike, LngLatLike] {
    return [
      this.getSWCoordinates(coordinatesCollection),
      this.getNECoordinates(coordinatesCollection),
    ];
  }

  centerMapIntoBounds(): void {
    const listOfCoordinates: number[][] = this.listings.map(listing => listing.locationCoordinates);
    const bounds: [LngLatLike, LngLatLike] = this.calcBoundsFromCoordinates(listOfCoordinates);
    this.fitBounds = bounds;
  }

  filterListingsByCategory() {
    this.$categoryEmiterSubscription = this.listinsgService.emitFilterCategory.subscribe((category) => {
      this.listings = [...this.listings.filter(listing => listing.category === category)];
      this.getFormatedListings()
    });
  }

}
