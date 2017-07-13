import {Component, ElementRef, ViewChildren} from '@angular/core';
import { NavController } from 'ionic-angular';
import {CategoryPage} from "../category/category";
import {SearchPage} from "../search/search";
import {ProductService} from "../../providers/product-service";
import {DomSanitizer} from "@angular/platform-browser";
import {HotoffersPage} from "../hotoffers/hotoffers";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {DetailsPage} from "../details/details";
import {ShoppingcartsPage} from "../shoppingcarts/shoppingcarts";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hotads : any ;
  public groupShow : any ;
  public wishList : any ;
  public cartNo : number = 0 ;
  @ViewChildren('productsIcon') elRef;
  constructor(public navCtrl: NavController , public productService : ProductService ,
              private sanitizer: DomSanitizer , public customerService : CustomerService ,
              public commonService : CommonService) {

  }
  ionViewWillEnter()
  {
     this.customerService.getCart().subscribe((res)=>{
      this.cartNo = res.length ;
     });
      this.productService.hotads().subscribe((res)=>{
        this.hotads = res ;
      });
      this.customerService.getWishList().subscribe((res)=>{
        this.wishList = res;
        this.getGroupShow();
      });
  }
  checkProductInFav(ProductID : number)
  {
    return this.commonService.checkProductIsExistInFavorite(this.wishList , ProductID);
  }
  getGroupShow()
  {
    this.productService.groupShow().subscribe((res)=>{
      this.groupShow = res ;
    });
  }
  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  goToHotOffers()
  {
    this.navCtrl.push(HotoffersPage);
  }
  gotosearch(){
    this.navCtrl.push(SearchPage);
  }

  addToWishList(ProductID : number)
  {
    let iconFilter :any ;
    iconFilter = this.elRef.toArray().filter((icon) => {
      return (icon.nativeElement.id == ProductID);
    });
    if(iconFilter[0].nativeElement.style.color == 'red')
      this.removeFav(ProductID , iconFilter[0].nativeElement);
    else
      this.addFav(ProductID , iconFilter[0].nativeElement);
  }
  addFav(ProductID : number , element : any ) {
    this.customerService.addToWishList(ProductID).subscribe((res) => {
      if (res == true) {
        this.commonService.successToast();
        element.style.color = 'red';
      }
      else
        this.commonService.errorToast();
    });
  }
  removeFav(ProductID : number , element : any)
  {
    this.customerService.deleteFav(ProductID).subscribe((res)=>{
      if (res.state == '202') {
            this.commonService.successToast();
        element.style.color = 'darkgrey';
          }
      else
        this.commonService.errorToast();
    });
  }
  addToCart(ProductID : number)
  {
    this.customerService.addToCart(ProductID).subscribe((res)=>{
      if(res == true)
      {
        this.commonService.successToast();
        this.cartNo++;
      }
      else if(res.error)
        this.commonService.translateAndToast(res.error);
      else
        this.commonService.errorToast();
    });
  }
  viewProduct(ProductID : number)
  {
    this.navCtrl.push(DetailsPage,{
      ProductID :ProductID
    });
  }
  goToCart()
  {
    this.navCtrl.push(ShoppingcartsPage);
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
}
