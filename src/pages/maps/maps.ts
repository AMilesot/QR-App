import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  lat: number;
  lng: number;

  constructor(public navParams: NavParams, private viewCtrl:ViewController) 
  {
    //this.lat = 9.97236509753971;
    //this.lng = 84.00716289046529;

    let coordsArray = this.navParams.get("coords").split(",");
    console.log(this.lat = Number(coordsArray[0].substr(4)));
    console.log(this.lng = Number(coordsArray[1]));


    console.log(this.navParams.get("coords"));
  }

  cerrar()
  {
    this.viewCtrl.dismiss();
  }

  

}
