import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController, Platform } from 'ionic-angular';
import { HistorialProvider } from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, 
              public toastCtrl: ToastController, 
              private platform:Platform,
              private _historialService:HistorialProvider) {}

  scan()
  {

    console.log("En proceso de escaneo");

    if(!this.platform.is('cordova'))
    {

      this._historialService.agregarLog("MATMSG:TO:punkadarok@gmail.com;SUB:Hola Mundo;BODY:Saludos YO;;")
      /*this._historialService.agregarLog("http://google.com");
      this._historialService.agregarLog("geo:9.97236509753971,-84.00716289046529");
      this._historialService.agregarLog( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );*/
      return;
    }

  
        
        this.barcodeScanner.scan().then(barcodeData => {
          /*console.log('Barcode data', barcodeData);
          console.log("Datos:", barcodeData.text);
          console.log("format:", barcodeData.format);
          console.log("cancelled:", barcodeData.cancelled);*/

          console.log( 'Datos:' + JSON.stringify( barcodeData ) ); 

          if(!barcodeData.cancelled && barcodeData.text != null)
            this._historialService.agregarLog(barcodeData.text);

            
        }).catch(err => {
            console.error('Error', err);
            this.presentToast("Error: " + err);
        });
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }
}