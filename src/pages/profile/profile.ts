import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Editprofile} from "../editprofile/editprofile";
import {CustomerService} from "../../providers/customer-service";
import {SignupPage} from "../signup/signup";
import {LoginPage} from "../login/login";
import {HistoryPage} from "../history/history";
import {AddlocationPage} from "../addlocation/addlocation";
import {CategoryPage} from "../category/category";
import {Settings} from "../settings/settings";
import {HomePage} from "../home/home";
import {WishlistPage} from "../wishlist/wishlist";
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
    this.navCtrl.push(Editprofile);
  }
  signUp()
  {
    this.navCtrl.push(SignupPage);
  }
  login()
  {
    this.navCtrl.push(LoginPage);
  }
  logOut()
  {
    this.customerService.customerStorageErase();
  }
  history()
  {
    this.navCtrl.push(HistoryPage);
  }
  goToMap()
  {
    this.navCtrl.push(AddlocationPage);
  }



 openhome(){
     this.navCtrl.push(HomePage)
   }
   opencat(){
    this.navCtrl.push(CategoryPage);
  }
  openfav(){
    this.navCtrl.push(WishlistPage);
  }
 
  opensett(){
    this.navCtrl.push(Settings)
  }
}
