import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage, HomePage, MapsPage, GuardadosPage} from "../pages/index.paginas";

//Plugins
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; // Lector de codigos
import { InAppBrowser } from '@ionic-native/in-app-browser'; //paginasWeb
import { AgmCoreModule } from '@agm/core'; //mapas (AngularGoogleMaps)
import { Contacts } from '@ionic-native/contacts';
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//         Los providers son los que se llaman servicios en angular, de hecho este provider es un servicio
import { HistorialProvider } from "../providers/historial/historial";

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapsPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0kVTuFO1Kvx1tAafNuGYpP-wgRIl7sl8'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider,
    InAppBrowser,
    Contacts
  ]
})
export class AppModule {}
