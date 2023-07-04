import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, ViewChild } from '@angular/core';
import { LngLatLike, Marker } from 'mapbox-gl';
import { NgxMapboxGLModule, PopupComponent } from 'ngx-mapbox-gl';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListingCardComponent } from '../listings/listing-card/listing-card.component';
import { listings } from 'src/app/mocks/listings';
import { NgFor, NgIf, CommonModule } from '@angular/common';

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

  data: GeoJSON.FeatureCollection = this.getFormatedListings();
  form: FormGroup;
  selectedListing: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> | null = null;
  selectedListingCoordinates: [number, number] = [0, 0];
  clusterProperties: object | undefined = this.getClusterProperties();

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      coordinates: [{ value: "", disabled: false }],
    });
  }

  handleClick = (data: any) => {
    console.log(data);

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

    console.log(listing!.properties!['featuredListing']?.split('_')[1]);
    

    this.selectedListingCoordinates = [listing.geometry.coordinates[0], listing.geometry.coordinates[1]];
    this.selectedListing = {
      ...listing,
      properties: {
        ...listing!.properties,
        listing: listings.find(elem => elem.id === listing!.properties!['id']
          || listing!.properties!['featuredListing']?.split('_')[1])
      }
    };
  }

  handleClosePopUp = () => {
    this.selectedListingCoordinates = [0, 0];
    this.selectedListing = null;
  }

  getFormatedListings(): GeoJSON.FeatureCollection {

    const formatedListings: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>[] = listings.map(listing => ({
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

    return geoJsonData;
  }

  getClusterProperties(): object | undefined {

    const getFeaturedListing = ["get", "featuredListing"];
    const accumulatedListingRating = ["to-number", ["slice", ["accumulated"], 0, ["index-of", "_", ["accumulated"]]]];
    const currentListingRating = ["to-number", ["slice", getFeaturedListing, 0, ["index-of", "_", getFeaturedListing]]];
    const reduceInitialListing = ["concat", ["get", "rating"], "_", ["get", "id"], "_", ["get", "price"]];

    return {
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

}
