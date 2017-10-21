import {Component, ViewChild, NgZone} from '@angular/core';
import {Platform, Tabs, Tab, NavController, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CustomerService} from "../providers/customer-service";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {TranslateService} from "@ngx-translate/core";
import {Network} from "@ionic-native/network";
import {CommonService} from "../providers/common-service";
import {CacheService} from 'ionic-cache';
import {DbService} from "../providers/db-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  initPage : string = null;
  tab1 : string = "HomePage";
  tab2 = "AllcategoriesPage";
  tab3 = "WishlistPage";
  tab4 = "Profile";
  tab5 = "Settings";
  @ViewChild('myTabs') tabRef: Tabs;
  @ViewChild('nav') nav:NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public customerService : CustomerService ,  public push :Push ,
              public translate : TranslateService , public network: Network ,
              public commonService : CommonService , public cache : CacheService ,
              public dbService : DbService , public zone: NgZone ,
              public alertCtrl : AlertController) {
    platform.ready().then(() => {
      //caching policy
      cache.setDefaultTTL(60 * 60 * 12)  ;
      cache.setOfflineInvalidate(false);
      // this.cache.enableCache(false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      setTimeout(function() {
        splashScreen.hide();
      }, 3000);
      // push
      this.pushInit();
      // chseck for any customer
      this.customerService.customerStorageGet();
        // .then(()=>{
        //   if(this.customerService.customer == null ){
        //     // this.initPage = "CityPage";
        //      this.tabRef._tabs[0].push("CityPage");
        //     // this.tabRef.select(0,{});
        //   }
          // else {
          //   this.initPage = "HomePage";
          //   this.tabRef._tabs[0].setRoot("HomePage");
          //   this.tabRef.select(0,{});
          // }
        // });
      // get location
      this.customerService.customerSetLocation();
      // rtl init
      this.translate.setDefaultLang('ar');
      platform.setDir('rtl', true);
      // handling offline
      this.fireWhenOffline();
      // handling online
      this.fireWhenOnline();


    });
  }
  fireWhenOnline()
  {
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        // connection of database
        console.log('network connected!!!!!');
        this.commonService.translateAndToast('Connection established');
        this.customerService.online = true ;
        this.dbService.openOrCreateSQLiteDB().then(()=>{
          console.log("enter function");
          this.customerService.pushLocalWishList();
          this.customerService.pushLocalCart();
        });
      }, 3000);
    });
  }
  fireWhenOffline()
  {
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.customerService.online = false ;
      this.dbService.openOrCreateSQLiteDB();
      this.commonService.translateAndToast('network was disconnected :-(');
    });
  }
  pushInit()
  {
    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID: '204319874451'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      this.handleEvents(notification);
    });

    pushObject.on('registration').subscribe((registration: any) => {
      this.customerService.deviceToken = registration.registrationId ;
      this.customerService.tokenStorageSave(registration.registrationId);
      console.log('Device registered', registration);
     });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  setRootTab1(){
    if(this.tabRef._tabs[0].getViews().length > 1)
      this.tabRef._tabs[0].setRoot("HomePage");
  }
  setRootTab2() {
    if(this.tabRef._tabs[1].getViews().length > 1)
      this.tabRef._tabs[1].setRoot("AllcategoriesPage");
  }
  setRootTab3() {
    if(this.tabRef._tabs[2].getViews().length > 1)
      this.tabRef._tabs[2].setRoot("WishlistPage");
  }
  setRootTab4() {
    if(this.tabRef._tabs[3].getViews().length > 1)
      this.tabRef._tabs[3].setRoot("Profile");
  }
  setRootTab5() {
    if(this.tabRef._tabs[4].getViews().length > 1)
      this.tabRef._tabs[4].setRoot("Settings");
  }
  handleEvents(data : any)
  {
    if (data.additionalData.foreground) {
      switch (data.additionalData.type)
      {
        case 'rejectOrder':
          this.rejectOrderEvent(data);
          break;
        default:
          alert("Wrong Grade.........");
      }
    } else {
      //if user NOT using app and push notification comes
      //TODO: Your logic on click of push notification directly
      console.log("Push notification clicked");
      alert(data.message);
    }
  }
  rejectOrderEvent(data : any)
  {
    let alert = this.alertCtrl.create({
      title: data.title,
      subTitle: data.message,
      buttons: [{
        text: 'OK',
        handler: res => {
          // this.readNotifications(data.additionalData.notification_id);
        }
      }]
    });
    alert.present();
  }
}

