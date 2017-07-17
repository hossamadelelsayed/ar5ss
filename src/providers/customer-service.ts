import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";
import {NativeStorage} from "@ionic-native/native-storage";
import {CommonService} from "./common-service";
import {TranslateService} from "@ngx-translate/core";
import {Geolocation} from "@ionic-native/geolocation";

/*
  Generated class for the CustomerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class CustomerService {

  public customer ;
  public lat : any ;
  public lang : any ;
  public deviceToken : string ="xyzx";
  public customerCreateUrl : string = MainService.baseUrl+"register/";
  public customerLoginUrl : string = MainService.baseUrl+"login/";
  public customerForgetPasswordUrl : string = MainService.baseUrl+"forgetpassword/";
  public addToWishListUrl : string = MainService.baseUrl+"inserttowishlist";
  public getWishListByCustomerUrl : string = MainService.baseUrl+"getwishlist/";
  public getWishListByTokenUrl : string = MainService.baseUrl+"getwishlistfortokenid/";
  public addToCartUrl : string = MainService.baseUrl+"addcart";
  public getCartByCustomerUrl : string = MainService.baseUrl+"cart/";
  public getCartByTokenUrl : string = MainService.baseUrl+"cartunregtsiter/";
  public deleteWishlistUrl : string = MainService.baseUrl+"deletWishlist/";
  public deleteFavUrl : string = MainService.baseUrl+"deletefav";
  public getComplainTypesUrl : string = MainService.baseUrl+"complaintype?lang=";
  public insertComplainUrl : string = MainService.baseUrl+"insertcomplain";
  public contactUrl : string = MainService.baseUrl+"contact";
  public aboutUrl : string = MainService.baseUrl+"about";
  public updateUserUrl : string = MainService.baseUrl+"updateuser/";
  public updateQtyUrl : string = MainService.baseUrl+"modifaycart/";
  public deleteCartUrl : string = MainService.baseUrl+"deletecart/";
  public addLocationUrl : string = MainService.baseUrl+"addlocation";
  public getUserLocationUrl : string = MainService.baseUrl+"userlocation/";
  public getPaymentTypesUrl : string = MainService.baseUrl+"payment?lang=";
  public confirmOrderUrl : string = MainService.baseUrl+"insertorder";
  public orderHistoryUrl : string = MainService.baseUrl+"orderhiostry/";
  public customerRateUrl : string = MainService.baseUrl+"rate";
  public getRelatedProductUrl : string = MainService.baseUrl+"getrelatedproduct/";





  public static readonly paymentVisaCode = 1 ;
  public static readonly paymentPaypalCode = 2 ;
  public static readonly paymentMadaCode = 3 ;
  public static readonly paymentSdadCode = 4 ;
  public static readonly paymentCashCode = 5 ;

  public static readonly RecentOrderCode = 1 ;
  public static readonly LastOrderCode = 2 ;


  constructor(public http: Http,public nativeStorage : NativeStorage,
              public commonService : CommonService, public translateService :TranslateService ,
              public geolocation: Geolocation) {
    console.log('Hello CustomerService Provider');
  }
  getRelatedProduct(ProductID : number)
  {
    return this.http.get(this.getRelatedProductUrl + ProductID ).map((res) => res.json());
  }
  customerRate(ProductID : number , Rate : number)
  {
    let body = {
      ProductID : ProductID,
      Rate : Rate,
      UserID : this.customer.UserID
    };
    return this.http.post(this.customerRateUrl , body ).map((res) => res.json());
  }
  deleteFav(ProductID : number)
  {
    let body ;
    if(this.customer != null)
    {
      body = {
        ProductID : ProductID ,
        UserID : this.customer.UserID
      };
    }
    else
    {
      body = {
        ProductID : ProductID ,
        TokenID : this.deviceToken
      };
    }
    return this.http.post(this.deleteFavUrl , body ).map((res) => res.json());
  }
  orderHistory(OrderState : number)
  {
    let body = {
      OrderState : OrderState
    };
    return this.http.post(this.orderHistoryUrl + this.customer.UserID , body ).map((res) => res.json());
  }
  confirmOrder(PaymentID :  number , LocationID : number)
  {
    let body = {
      UserID : this.customer.UserID ,
      PaymentID : PaymentID ,
      LocationID : LocationID
    };
    return this.http.post(this.confirmOrderUrl , body ).map((res) => res.json());
  }
  getPaymentTypes()
  {
    return this.http.get(this.getPaymentTypesUrl + MainService.lang ).map((res) => res.json());
  }
  getUserLocation() {
    return this.http.get(this.getUserLocationUrl + this.customer.UserID ).map((res) => res.json());
  }
  addLocation(latitude : string , longitude : string , Place : string)
  {
    let body = {
      UserID : this.customer.UserID,
      latitude : latitude ,
      longitude :  longitude ,
      Place : Place
    };
    return this.http.post(this.addLocationUrl , body ).map((res) => res.json());
  }
  deleteCart(CartID : number  ) {
    return this.http.delete(this.deleteCartUrl + CartID ).map((res) => res.json());
  }
  updateQTY(QTY : number ,  CartID : number  ) {
    let body = {
      QTY: QTY
    };
    return this.http.put(this.updateQtyUrl + CartID , body).map((res) => res.json());
  }
  updateUser(Name : string ,
             Email : string ,
             Mobile : string ,
             Image: string  ) {
    let customer = {
      Name: Name,
      Email: Email,
      Mobile: Mobile,
      Image: Image
    };
    return this.http.put(this.updateUserUrl + this.customer.UserID , customer).map((res) => res.json());
  }
  about()
  {
    return this.http.get(this.aboutUrl).map((res) => res.json());
  }
  contact(Email : string,Title : string,Body : string)
  {
    let body = {
      Email : Email ,
      Title : Title ,
      Body : Body
    };
    return this.http.post(this.contactUrl,body).map((res) => res.json());
  }

  insertComplain(UserID : number, ComplainTypeId : number, Tittle :string, Descriotion : string)
  {
    let body = {
      UserID : UserID,
      ComplainTypeId : ComplainTypeId ,
      Tittle : Tittle,
      Descriotion : Descriotion
    };
    return this.http.post(this.insertComplainUrl,body).map((res) => res.json());
  }
  getComplainTypes()
  {
    return this.http.get(this.getComplainTypesUrl+MainService.lang).map((res) => res.json());
  }
  deleteWishlist(favoritID : number)
  {
      return this.http.delete(this.deleteWishlistUrl+favoritID).map((res) => res.json());
  }
  addToCart(ProductID : number , SellerID : number)
  {
    let body ;
    if(this.customer != null)
    {
      body = {
        ProductID : ProductID ,
        UserID : this.customer.UserID,
        QTY: 1 ,
        Lang : this.lang ,
        Lat : this.lat ,
        SellerID : SellerID
      };
    }
    else
    {
      body = {
        ProductID : ProductID ,
        TokenID : this.deviceToken ,
        QTY: 1 ,
        Lang : this.lang ,
        Lat : this.lat ,
        SellerID : SellerID
      };
    }
    return this.http.post(this.addToCartUrl,body).map((res) => res.json());
  }
  getCart()
  {
    if(this.customer != null)
      return this.http.get(this.getCartByCustomerUrl+this.customer.UserID).map((res) => res.json());
    else
      return this.http.get(this.getCartByTokenUrl+this.deviceToken).map((res) => res.json());
  }
  addToWishList(ProductID : number)
  {
    let body ;
    if(this.customer != null)
    {
      body = {
        ProductID : ProductID ,
        UserID : this.customer.UserID
      };
    }
    else
    {
      body = {
        ProductID : ProductID ,
        TokenID : this.deviceToken
      };
    }
    return this.http.post(this.addToWishListUrl,body).map((res) => res.json());
  }
  getWishList()
  {
    if(this.customer != null)
      return this.http.get(this.getWishListByCustomerUrl+this.customer.UserID).map((res) => res.json());
    else
      return this.http.get(this.getWishListByTokenUrl+this.deviceToken).map((res) => res.json());
  }
  customerForgetPassword(Email : string )
  {
    return this.http.post(this.customerForgetPasswordUrl+MainService.lang,{Email:Email}).map((res) => res.json());
  }
  customerCreate(Name : string ,
                 Email : string ,
                 Password : string ,
                 Mobile : string ,
                 Image: string  )
  {
    let customer = {
      Name : Name ,
      Email : Email ,
      Password : Password ,
      Mobile : Mobile ,
      UseType : 1 ,
      DivceType : 1 ,
      Token : this.deviceToken ,
      Image: Image
    };
    return this.http.post(this.customerCreateUrl+MainService.lang,customer).map((res) => res.json());
  }
  customerLogin(Email : string , Password : string )
  {
    let customer = {
      Email : Email ,
      Password : Password ,
      TokenID : this.deviceToken
    };
    return this.http.post(this.customerLoginUrl+MainService.lang,customer).map((res) => res.json());
  }
  customerStorageSave(customer:any){
    this.nativeStorage.setItem('customer', customer)
      .then(
        () => {
          this.customer = customer;
          console.log('Customer Is Stored!');
        },
        error => console.error('Error storing item', error)
      );
  }
  customerStorageErase(){
    this.nativeStorage.remove('customer')
      .then(
        () => {
          this.customer = null;
          console.log('Customer Is Erased!');
        },
        error => console.error(error)
      );
  }
  customerStorageGet(){
    this.nativeStorage.getItem('customer')
      .then(
        (customer) => {
          this.customer = customer;
          console.log('Customer Is Geted!');
          //return customer
        },
        error => console.error(error)
      );
  }

  customerSetLocation()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude ;
      this.lang = resp.coords.longitude ;
      console.log(this.lat + ' ' + this.lat);
    });
  }
}
