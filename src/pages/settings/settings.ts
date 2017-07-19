import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Complain} from "../complain/complain";
import {Contact} from "../contact/contact";
import {CustomerService} from "../../providers/customer-service";
import {MainService} from "../../providers/main-service";
import {TranslateService} from "@ngx-translate/core";
import {CommonService} from "../../providers/common-service";
import {AboutPage} from "../about/about";
import {CategoryPage} from "../category/category";
import {Profile}from "../profile/profile";
import {HomePage} from "../home/home";
import {WishlistPage} from "../wishlist/wishlist";
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  public MainService : MainService = MainService ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public platform : Platform ,
              private translate: TranslateService , public commonService :  CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }
 gotocomplain(){
   if(this.customerService.customer != null)
    this.navCtrl.push(Complain);
   else this.commonService.translateAndToast('You Have To Login First');
 }
 gotocontact(){
   this.navCtrl.push(Contact);
 }
 gotoAbout()
 {
   this.navCtrl.push(AboutPage);
 }
  changeLang(type){
    this.translate.setDefaultLang(type);
    MainService.lang = type;
    if(type == 'en')
      this.platform.setDir('ltr', true);
    else
      this.platform.setDir('rtl', true);
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
  openpro(){
    this.navCtrl.push(Profile);
  }

}
