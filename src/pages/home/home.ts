import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public isRideRequested: boolean;

  constructor() {
    this.isRideRequested = false;
  }

  requestRide() {
    this.isRideRequested = true;
  }

  cancelRide() {
    this.isRideRequested = false;
  }

}
