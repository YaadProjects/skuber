import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {

  @Input() isRideRequested: boolean;

  public map;
  public location;

  constructor(public loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.map = this.createMap();

    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });
  }

  getCurrentLocation() {

    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });

    loading.present(loading);

    let options = {timeout: 10000, enableHighAccuracy: true};

    let locationObs = Observable.create(observable => {

      Geolocation.getCurrentPosition(options)
        .then(resp => {
            let lat = resp.coords.latitude;
            let lng = resp.coords.longitude;

            let location = new google.maps.LatLng(lat, lng);

            console.log('Geolocation: ' + location);

            observable.next(location);

            loading.dismiss();
          },
          (err) => {
            console.log('Geolocation err: ' + err);
            loading.dismiss();
          })
    })

    return locationObs;
  }

  createMap(location = new google.maps.LatLng(40.7127, -74.00594)) {
    let mapOptions = {
      center: location,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);

    return map;
  }

  centerLocation(location) {

    if (location) {
      this.map.panTo(location);
    }
    else {

      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      });
    }
  }
}
