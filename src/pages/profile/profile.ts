import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }
  edit(){
    this.navCtrl.push("Editprofile");
  }
  signUp()
  {
    this.navCtrl.push("SignupPage");
  }
  login()
  {
    this.navCtrl.push("LoginPage");
  }
  logOut()
  {
    this.customerService.customerStorageErase();
  }
  history()
  {
    this.navCtrl.push("HistoryPage");
  }
  goToMap()
  {
    this.navCtrl.push("AddlocationPage");
  }



}
