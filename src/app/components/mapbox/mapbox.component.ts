import { Component, Input } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  imports: [NgxMapboxGLModule],
  standalone: true
})
export class MapboxComponent {

  @Input() style: string = "mapbox://styles/mapbox/streets-v9";
  @Input() center: LngLatLike | undefined = [-74.5, 40];
  @Input() zoom: [number] = [9];

}
