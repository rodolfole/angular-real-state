// Core Imports
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

// External Imports
import { map } from "rxjs/operators";
import * as Mapboxgl from 'mapbox-gl';
import { Observable, Subject } from 'rxjs';

// Internal Imports
import { environment } from "../../environments/environment";

// Services

export interface MapboxPopUp {
    bussinessImage?: string;
    bussinessName: string;
    externalNumber?: number;
    internalNumber?: number;
    lawyerId?: string;
    street: string;
    suburb?: string;
    postalCode?: number;
}

export interface MapboxOutput {
    attibution: string;
    features: Feature[];
    query: [];
}

export interface Feature {
    center: number[];
    context: Context[];
    place_name: string;
}

export interface Context {
    short_code: string,
    text: string,
}

interface Marker {
    type: string,
    geometry: {
        type: string,
        coordinates: [number, number]
    },
    properties: {
        iconSize: [number, number]
    }
}

@Injectable({
    providedIn: "root",
})

export class MapBoxService {

    featuresObservable = new Subject<[Feature[], boolean]>();

    constructor(private http: HttpClient) { }

    addMapGeolocateControl(mapInstance: Mapboxgl.Map) {

        const geolocateControl = new Mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        })

        mapInstance.addControl(geolocateControl);

        mapInstance.on('load', function () {
            geolocateControl.trigger(); //<- Automatically activates geolocation
        });

        geolocateControl.on('geolocate', (e: any) => {
            const lon = e.coords.longitude;
            const lat = e.coords.latitude
            const mapboxSuscription = this.searchAddress(encodeURIComponent(lon + ',' + lat))
                .subscribe((features: Feature[]) => {
                    mapInstance.removeControl(geolocateControl)
                    this.setNewAddressLocation(features, true);
                    mapboxSuscription.unsubscribe();
                })
        });
    }

    addMapMarker(mapInstance: Mapboxgl.Map, lon: number, lat: number, mapPopUpInstance?: Mapboxgl.Popup, isDraggable: boolean = false): Mapboxgl.Marker {
        const marker: Marker = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lon, lat]
            },
            properties: {
                iconSize: [42, 60]
            }
        };

        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(../../../assets/images/icons/marker.svg)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        // make a marker and add it to the map
        const markerInstance = new Mapboxgl.Marker({
            color: "#2e89ff",
            draggable: isDraggable,
            element: el
        }).setLngLat(marker.geometry.coordinates).addTo(mapInstance);

        mapPopUpInstance && markerInstance.setPopup(mapPopUpInstance);

        mapInstance.flyTo({
            center: [lon, lat]
        });

        markerInstance.on('dragend', () => {
            const mapboxSuscription = this.searchAddress(encodeURIComponent(markerInstance.getLngLat().lng + ',' + markerInstance.getLngLat().lat))
                .subscribe((features: Feature[]) => {
                    this.setNewAddressLocation(features, false);
                    mapboxSuscription.unsubscribe();
                })
        });

        return markerInstance;
    }

    createMapInstance(container: string, lon: number, lat: number): Mapboxgl.Map {
        return new Mapboxgl.Map({
            accessToken: environment.mapboxKey,
            container, // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [lon, lat], // starting position -> LNG, LAT
            zoom: 17 // starting zoom
        });
    }

    createMapPopUpInstance(popupData: MapboxPopUp): Mapboxgl.Popup {
        const mapboxPopupInstance = new Mapboxgl.Popup({ className: "mapbox-container", maxWidth: "none", offset: 25 });
        mapboxPopupInstance.setHTML(this.createMapPopUpComponent(popupData));

        return mapboxPopupInstance;
    }

    createMapPopUpComponent(popupData: MapboxPopUp): string {
        return `<div class='dfc mapbox-content'>
                    <div class='dfr mapbox-header w-full'>
                        <div class="border-none centered-img-bg"><img src=${popupData.bussinessImage} alt='site-logo'></div>
                        <div class="mapbox-header-title"><span>${popupData.bussinessName}</span></div>
                    </div>
                    <div class="dfc mapbox-body w-full">
                        <span class="mapbox-body-title">
                        ${popupData.street} 
                        ${popupData.externalNumber ? ('#' + popupData.externalNumber) : ''}
                        ${popupData.internalNumber ? ('- ' + popupData.internalNumber) : ''}
                        </span>
                        ${popupData.suburb ? `<span>Colonia: ${popupData.suburb}</span>` : ''}
                        <span>Código Postal: ${popupData.postalCode ? popupData.postalCode : 'N/E'}</span>
                        <div class="dfr w-full">
                            
                            ${popupData.lawyerId
                ? `<a class="mapbox-body-link" href="/#/abogado-detalle/${popupData.lawyerId}">Ver perfil del abogado</a>`
                : ''}
                        </div>
                    </div>
                </div>`

        // <a class="mapbox-body-link" target="_blank" href="https://www.google.com/maps/place/Calle+del+Prof.+Francisco+Mora+158,+Hacienda+Palomino,+47180+Arandas,+Jal./@20.7025236,-102.3475795,18z/data=!4m5!3m4!1s0x84294c786293c65f:0xd39e72871ebc62f5!8m2!3d20.7032534!4d-102.3455523">Abrir en Google Maps</a>
    }

    createMapPopUpObject(popupData: MapboxPopUp): MapboxPopUp {
        return {
            bussinessImage: popupData.bussinessImage ? popupData.bussinessImage : '../../../assets/images/New_image.jpg',
            bussinessName: popupData.bussinessName ? popupData.bussinessName : '[Negocio]',
            street: popupData.street,
            ...(popupData.externalNumber && { externalNumber: popupData.externalNumber }),
            ...(popupData.internalNumber && { internalNumber: popupData.internalNumber }),
            ...(popupData.lawyerId && { lawyerId: popupData.lawyerId }),
            ...(popupData.postalCode && { postalCode: popupData.postalCode }),
            ...(popupData.suburb && { suburb: popupData.suburb })
        }
    }

    deleteMapInstance(mapInstance: Mapboxgl.Map) {
        mapInstance.remove();
    }

    getNewAddressLocation(): Observable<[Feature[], boolean]> {
        return this.featuresObservable.asObservable();
    }

    searchAddress(query: string): Observable<Feature[]> {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        return this.http.get<MapboxOutput>(url + query.trim() + '.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token='
            + environment.mapboxKey).pipe(map((res: MapboxOutput) => res.features));
    }

    setMarkerCoordinates(mapInstance: Mapboxgl.Map, markerInstance: Mapboxgl.Marker, lon: number, lat: number) {
        markerInstance.setLngLat([lon, lat]);

        mapInstance.flyTo({
            center: [lon, lat]
        });
    }

    setNewAddressLocation(features: Feature[], addMarker: boolean) {
        this.featuresObservable.next([features, addMarker]);
    }

    setPopupContent(mapboxPopupInstance: Mapboxgl.Popup, popupData: MapboxPopUp) {
        mapboxPopupInstance.setHTML(this.createMapPopUpComponent(popupData));
    }
}
