import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HospitalDataService } from '../service/hospital.service';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  hospitalData = [];

  constructor(
    private geolocation: Geolocation,
    private hospitalSerivice: HospitalDataService) { }

  ngOnInit() {
    this.hospitalData = this.hospitalSerivice.getHospitals();
    this.displayGoogleMap();
    this.getMarkers();
  }

  displayGoogleMap() {
    const latLng = new google.maps.LatLng(28.6117993, 77.2194934);

    const mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    // tslint:disable-next-line:variable-name
    for (let _i = 0; _i < this.hospitalData.length; _i++) {
      if (_i > 0) {
        this.addMarkersToMap(this.hospitalData[_i]);
      }
    }
  }

  addMarkersToMap(hospital) {
    const position = new google.maps.LatLng(hospital.latitude, hospital.longitude);
    const hospitalMarker = new google.maps.Marker({ position, title: hospital.name });
    hospitalMarker.setMap(this.map);
  }
}
