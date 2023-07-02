import { Component, Input } from '@angular/core';
import { LngLatLike, Marker } from 'mapbox-gl';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListingCardComponent } from '../listings/listing-card/listing-card.component';
import { Listing } from 'src/app/types/listing';
import { listings } from 'src/app/mocks/listings';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  imports: [NgxMapboxGLModule, ReactiveFormsModule, ListingCardComponent],
  standalone: true
})
export class MapboxComponent {

  @Input() style: string = "mapbox://styles/mapbox/streets-v9";
  @Input() center: LngLatLike | undefined = [-74.5, 40];
  @Input() zoom: [number] = [9];
  @Input() markers: Marker[] = [];
  listing: Listing = listings[0];
  // @Input() projection: Projection = {
  //   name: 'globe',
  //   center: [35, 55],
  //   parallels: [20, 60]
  // };

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      coordinates: [{ value: "", disabled: false }],
    });
  }

}
