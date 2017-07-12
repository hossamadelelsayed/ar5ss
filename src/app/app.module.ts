import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Profile} from "../pages/profile/profile";
import {Settings} from "../pages/settings/settings";
import {Editprofile} from "../pages/editprofile/editprofile";
import {Complain} from "../pages/complain/complain";
import {AllcategoriesPage} from "../pages/allcategories/allcategories";
import {CategoryPage} from "../pages/category/category";
import {HistoryPage} from "../pages/history/history";
import {HotoffersPage} from "../pages/hotoffers/hotoffers";
import {SearchPage} from "../pages/search/search";
import {WishlistPage} from "../pages/wishlist/wishlist";
import {ConfirmPage} from "../pages/confirm/confirm";
import {ForgetpassPage} from "../pages/forgetpass/forgetpass";
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {EmptyhistoryPage} from "../pages/emptyhistory/emptyhistory";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MainService} from "../providers/main-service";
import {CustomerService} from "../providers/customer-service";
import {CommonService} from "../providers/common-service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http, HttpModule} from "@angular/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Camera} from "@ionic-native/camera";
import {NativeStorage} from "@ionic-native/native-storage";
import {ProductService} from "../providers/product-service";
import {Push} from "@ionic-native/push";
import {Contact} from "../pages/contact/contact";
import {AboutPage} from "../pages/about/about";
import {DetailsPage} from "../pages/details/details";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {OtherofferPage} from "../pages/otheroffer/otheroffer";
import {HighlightDirective} from "../directives/highlight.directive";
import {AddlocationPage} from "../pages/addlocation/addlocation";
import {ShoppingcartsPage} from "../pages/shoppingcarts/shoppingcarts";
import {SummaryPage} from "../pages/summary/summary";
import {PayPal} from "@ionic-native/paypal";
import {Geolocation} from "@ionic-native/geolocation";
import {OrderDetailsPage} from "../pages/order-details/order-details";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfirmPage,
    ForgetpassPage,
    LoginPage,
    SignupPage,
    AllcategoriesPage,
    CategoryPage,
    HistoryPage,
    HotoffersPage,
    SearchPage,
    WishlistPage,
    EmptyhistoryPage,
    Profile,
    Settings,
    Editprofile,
    Complain,
    Contact,
    AboutPage,
    DetailsPage,
    OtherofferPage,
    HighlightDirective ,
    AddlocationPage ,
    ShoppingcartsPage ,
    SummaryPage ,
    OrderDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfirmPage,
    ForgetpassPage,
    LoginPage,
    SignupPage,
    AllcategoriesPage,
    CategoryPage,
    HistoryPage,
    HotoffersPage,
    SearchPage,
    WishlistPage,
    EmptyhistoryPage,
    Profile,
    Settings,
    Editprofile,
    Complain,
    Contact,
    AboutPage ,
    DetailsPage,
    OtherofferPage,
    AddlocationPage ,
    ShoppingcartsPage ,
    SummaryPage ,
    OrderDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MainService,
    CustomerService,
    CommonService,
    Camera,
    NativeStorage,
    ProductService,
    Push,
    BarcodeScanner,
    PayPal ,
    Geolocation
  ]
})
export class AppModule {}
