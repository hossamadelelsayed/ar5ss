import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {MainService} from "../../providers/main-service";
import {TranslateService} from "@ngx-translate/core";
import {CommonService} from "../../providers/common-service";



@IonicPage()
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
    this.navCtrl.push("Complain");
   else this.commonService.translateAndToast('You Have To Login First');
 }
 gotocontact(){
   this.navCtrl.push("Contact");
 }
 gotoAbout()
 {
   this.navCtrl.push("AboutPage");
 }
  changeLang(type){
    this.translate.setDefaultLang(type);
    MainService.lang = type;
    if(type == 'en')
      this.platform.setDir('ltr', true);
    else
      this.platform.setDir('rtl', true);
  }



}
