import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";
import {CustomerService} from "./customer-service";
import {CacheService} from 'ionic-cache';
import {Observable} from "rxjs";

/*
  Generated class for the ProductService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductService {

  public categoryUrl : string = MainService.baseUrl+"category?lang=";
  public categoryProductsUrl : string = MainService.baseUrl+"getcategorydeatails/";
  public hotadsUrl : string = MainService.baseUrl+"hotads";
  public groupShowUrl : string = MainService.baseUrl+"groupshow/";
  public groupProductPaginateUrl : string = MainService.baseUrl+ "getgrouppaginate/";
  public hotOfferUrl : string = MainService.baseUrl+"hotoffer?lang=";
  public productDetailsUrl : string = MainService.baseUrl+"productDetails/";
  public productBarcodeUrl : string = MainService.baseUrl+"productBarcode/";
  public productColorUrl : string = MainService.baseUrl+"productcolor";
  public searchProductUrl : string = MainService.baseUrl+"serachproduct";
  public getProductPropertyUrl : string = MainService.baseUrl+"getPoductValue/";
  public getProductSortUrl : string = MainService.baseUrl+"getproductsort/";
  public getGroupProductsUrl : string = MainService.baseUrl+"getproductofgroupshow/";

  public readonly sortByASC : number = 1 ;
  public readonly sortByDESC : number = 2 ;




  constructor(public http: Http ,public customerService : CustomerService ,
              public cache : CacheService) {
    console.log('Hello ProductService Provider');
  }
  getGroupProducts(GroupID : number)
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    return this.http.get(this.getGroupProductsUrl + userKey + '/' + GroupID  + '?lang=' + MainService.lang).map((res) => res.json());
  }
  searchProduct(KeyWord : string)
  {
    let body = {
      KeyWord : KeyWord
    };
    return this.http.post(this.searchProductUrl , body ).map((res) => res.json());
  }
  getProductProperty(ProductID : number)
  {
    return this.http.get(this.getProductPropertyUrl + ProductID + '?lang=' + MainService.lang).map((res) => res.json());
  }
  productColor(ProductID : number , ColorID : number)
  {
    let body = {
      ProductID : ProductID ,
      ColorID : ColorID
      };
    return this.http.post(this.productColorUrl , body ).map((res) => res.json());
  }
  productBarcode(barcode : any)
  {
    return this.http.get(this.productBarcodeUrl+barcode).map((res) => res.json());
  }
  productDetails(ProductID : number)
  {
    let url = this.productDetailsUrl+ProductID + '?lang=' + MainService.lang ;
    return this.http.get(url).map((res) => res.json());
    // let request = this.http.get(url).map((res) => res.json());
    // return this.cache.loadFromObservable(url,request);
  }
  hotOffer()
  {
    return this.http.get(this.hotOfferUrl + MainService.lang ).map((res) => res.json());
  }
  category()
  {
    return this.http.get(this.categoryUrl + MainService.lang).map((res) => res.json());
  }
  hotads()
  {
    return this.http.get(this.hotadsUrl).map((res) => res.json());
  }
  groupShow()
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    let url = this.groupShowUrl + userKey + '?lang=' + MainService.lang ;
    return this.http.get(url).map((res) => res.json());
    // let request = this.http.get(url).map((res) => res.json());
    // return this.cache.loadFromObservable(url,request);
  }
  getProductSort( sortBy : number , category_id : number ): Observable<any>
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    let url = this.getProductSortUrl + userKey + '/' + sortBy + '/' + category_id +'?lang=' + MainService.lang ;
    return this.http.get(url).map((res) => res.json());

  }
  groupProductPaginate(GroupID : number , CurrentPage : number)
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    let url = this.groupProductPaginateUrl + userKey + '/' + GroupID + '/' + CurrentPage +'?lang=' + MainService.lang ;
    return this.http.get(url).map((res) => res.json());
    // let request = this.http.get(url).map((res) => res.json());
    // return this.cache.loadFromObservable(url,request);
  }
  categoryProducts(category_id : number , CurrentPage : number ,sortBy? : number)
  {
    if(sortBy == null)
      sortBy = this.sortByASC ;
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    return this.http.get(this.categoryProductsUrl + CurrentPage + '/' + userKey + '/' + category_id + '/' + sortBy + '?lang=' + MainService.lang).map((res) => res.json());
  }
}
