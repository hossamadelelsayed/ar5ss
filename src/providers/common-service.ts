import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, LoadingController, Loading} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

/*
  Generated class for the CommonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {
  public loader : Loading;
  constructor(public http: Http,public toastCtrl : ToastController ,
              public translateService : TranslateService , public loadingCtrl : LoadingController) {
    console.log('Hello CommonService Provider');
  }
  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 750
    });
    toast.present();
  }
  successToast()
  {
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);
      }
    );


  }
  errorToast()
  {
    this.translateService.get('Error').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);

      }
    );
  }
  translateAndToast(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);

      }
    );
  }
  getTranslation(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        return value;

      }
    );
  }
  presentLoading(txt:string) {
    this.loader = this.loadingCtrl.create({
      content: txt
    });
    this.loader.present();
  }
  dismissLoading(){
    this.loader.dismiss();
  };
  isArray(ar) {
    return Object.prototype.toString.call(ar) === '[object Array]';
  }
  checkProductIsExistInFavorite(FavoriteArray : any ,value: any)
  {
    let ArrayFilter :any ;
    ArrayFilter = FavoriteArray.filter((item) => {
      return (item.ProductID == value);
    });
    if(ArrayFilter.length > 0)
      return true ;
    else return false ;
  }

}
