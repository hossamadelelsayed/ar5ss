import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";

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
  public groupShowUrl : string = MainService.baseUrl+"groupshow";
  public hotOfferUrl : string = MainService.baseUrl+"hotoffer";
  public productDetailsUrl : string = MainService.baseUrl+"productDetails/";
  public productBarcodeUrl : string = MainService.baseUrl+"productBarcode/";
  public productColorUrl : string = MainService.baseUrl+"productcolor";
  public searchProductUrl : string = MainService.baseUrl+"serachproduct";
  public readonly sortByASC : number = 1 ;
  public readonly sortByDESC : number = 2 ;




  constructor(public http: Http) {
    console.log('Hello ProductService Provider');
  }
  searchProduct(KeyWord : string)
  {
    let body = {
      KeyWord : KeyWord
    };
    return this.http.post(this.searchProductUrl , body ).map((res) => res.json());
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
    return this.http.get(this.productDetailsUrl+ProductID).map((res) => res.json());
  }
  hotOffer()
  {
    return this.http.get(this.hotOfferUrl).map((res) => res.json());
  }
  category()
  {
    return this.http.get(this.categoryUrl + MainService.lang).map((res) => res.json());
  }
  categoryProducts(category_id : number , sortBy? : number)
  {
    if(sortBy == null)
      sortBy = this.sortByASC ;
    return this.http.get(this.categoryProductsUrl+category_id+'/'+sortBy).map((res) => res.json());
  }
  hotads()
  {
    return this.http.get(this.hotadsUrl).map((res) => res.json());
  }
  groupShow()
  {
    return this.http.get(this.groupShowUrl).map((res) => res.json());
  }
}
