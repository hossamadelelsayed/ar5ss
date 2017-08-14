import {Component, ViewChild} from '@angular/core';
import {Platform, Tabs, Tab} from 'ionic-angular';
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
  tab1 : string = "HomePage";
  tab2 = "AllcategoriesPage";
  tab3 = "WishlistPage";
  tab4 = "Profile";
  tab5 = "Settings";
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public customerService : CustomerService ,  public push :Push ,
              public translate : TranslateService , public network: Network ,
              public commonService : CommonService , public cache : CacheService ,
              public dbService : DbService ) {
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
      // get location
      this.customerService.customerSetLocation();
      // rtl init
      this.translate.setDefaultLang('ar');
      platform.setDir('rtl', true);
      // handling online
      this.fireWhenOnline();
      // handling offline
      this.fireWhenOffline();

    });
  }
  fireWhenOnline()
  {
    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.customerService.online = true ;
      this.customerService.pushLocalWishList();
      this.customerService.pushLocalCart();
    });
  }
  fireWhenOffline()
  {
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.customerService.online = false ;
      this.dbService.openOrCreateSQLiteDB();
      this.commonService.translateArray(['network was disconnected :-(']).subscribe((res)=>{
        alert(res[0]);
      });
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

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

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
}

