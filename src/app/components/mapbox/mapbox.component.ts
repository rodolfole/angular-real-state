import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { GeoJSONSourceRaw, LngLatLike, Marker } from 'mapbox-gl';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListingCardComponent } from '../listings/listing-card/listing-card.component';
import { listings } from 'src/app/mocks/listings';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  imports: [NgxMapboxGLModule, ReactiveFormsModule, ListingCardComponent, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class MapboxComponent {

  @Input() style: string = "mapbox://styles/mapbox/streets-v9";
  @Input() center: LngLatLike | undefined = [13.401200, 52.518964];
  @Input() zoom: [number] = [14];
  @Input() markers: Marker[] = [];

  data: GeoJSON.FeatureCollection = this.getFormatedListings();
  form: FormGroup;
  selectedListing: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[] | null = null;

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

  handleClickSecondary = (listing: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[] | null) => {
    this.selectedListing = listing;
  }

  getFormatedListings(): GeoJSON.FeatureCollection {

    const formatedListings: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[] = listings.map(listing => ({
      type: "Feature",
      properties: {
        id: listing.id,
        price: listing.price
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

}
