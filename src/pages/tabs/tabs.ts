import { Component } from '@angular/core';
import { HomePage, GuardadosPage } from "../index.paginas";



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  home:any 
  log:any 

  constructor() 
  {
    this.home = HomePage;
    this.log= GuardadosPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
