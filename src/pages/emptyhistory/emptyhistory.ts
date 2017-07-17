import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HistoryPage} from "../history/history";
@Component({
  selector: 'page-emptyhistory',
  templateUrl: 'emptyhistory.html',
})
export class EmptyhistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmptyhistoryPage');
  }
gothistory(){
  this.navCtrl.push(HistoryPage);
}
}
