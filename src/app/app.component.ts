import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import {CategoryPage} from "../pages/category/category";
import {WishlistPage} from "../pages/wishlist/wishlist";
import {CustomerService} from "../providers/customer-service";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {Profile} from "../pages/profile/profile";
import {Settings} from "../pages/settings/settings";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage= LoginPage;
  tab1 = HomePage;
  tab2 = CategoryPage;
  tab3 = WishlistPage;
  tab4 = Profile;
  tab5 = Settings;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public customerService : CustomerService ,  public push :Push ,
              public translate : TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // chseck for any customer
      this.customerService.customerStorageGet();
      // get location
      this.customerService.customerSetLocation();
      // push
      this.pushInit();
      // rtl init
      this.translate.setDefaultLang('ar');
      //platform.setDir('rtl', true);
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
      console.log('Device registered', registration)
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}

