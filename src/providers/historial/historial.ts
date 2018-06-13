import { Injectable } from '@angular/core';
import { ScanData } from "../../models/scan-data.model";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController } from "ionic-angular"
import { MapsPage } from "../../pages/maps/maps";
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ToastController } from 'ionic-angular';


@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];

  constructor(private _iab: InAppBrowser, private modalCtrl:ModalController, private contacts: Contacts, private toastCtrl:ToastController) {}

  agregarLog(texto: string)
  {
    let data = new ScanData(texto);
    this._historial.unshift(data);
    console.log(this._historial);
    this.abrirData(0);
  }

  abrirData(index: number)
  {
    let ScanData = this._historial[index];
    console.log(ScanData);

    switch (ScanData.tipo) {
      case "http":
        this._iab.create(ScanData.info, "_system");
        break;

      case "mapa":
        this.modalCtrl.create(MapsPage, {coords: ScanData.info}).present();
        break;
      
        case "contacto":
        this.crearContacto(ScanData.info);
        break;

        case "email":
        let htmLink = ScanData.info;
        htmLink = htmLink.replace("MATMSG:TO","mailto");
        htmLink = htmLink.replace(";SUB:","?subject=");
        htmLink = htmLink.replace(";BODY:","&body=");
        htmLink = htmLink.replace(";;","");
        htmLink = htmLink.replace(/ /g,"%20"); // las diagonales significa que va a agarrar ese caracter la "g" indica que es para todas las incidencias (general) y lo reemplaza con el caracter compatible para html

        console.log(htmLink);
        this._iab.create(htmLink,"_system");
        break;
    
      default:
        console.error("No se encuentra definicion para tipo de archivo");
    }
  }
  private crearContacto(texto:string)
  {
    let campos:any = this.parse_vcard(texto);
    console.log(campos);
    

    let contact: Contact = this.contacts.create();
    //let nombre = campos['fn']; // hace referencia al nombre donde se encuentra almacenado el valor por medio de corchetes y el nombre
    let nombre = campos.fn;
    console.log(nombre);
    let tel = campos.tel[0].value[0]; // hace referencia igual solo que no entre corchetes si no de una manera mas transparente
    console.log(tel);

    //:::::::::::::::::::::::::::::::::::::::::::::::::
    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];
    contact.save().then( () => this.elToast("Contacto " + nombre + "creado!"),
                         (error: any) => this.elToast("Error:" + error)
                        );

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  }

  private elToast(mensaje: string)
  {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1850,
      position: 'bottom'
    });
    toast.present();
  }

  cargarHistorial()
  {
    return this._historial;
  }


  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //codigo ya bajado para hacer el parse a un V-card
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

}
  