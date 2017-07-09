import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{SummaryPage} from "../summary/summary";
@Component({
  selector: 'page-shoppingcarts',
  templateUrl: 'shoppingcarts.html',
})
export class ShoppingcartsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingcartsPage');
  }
gotosummary(){
  this.navCtrl.push(SummaryPage);
}
}
