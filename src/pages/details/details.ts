import {Component, ViewChildren} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {ProductService} from "../../providers/product-service";
import {CommonService} from "../../providers/common-service";
import {OtherofferPage} from "../otheroffer/otheroffer";

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  public ProductID : number ;
  public productDetails : any ;
  public wishList : any ;

  @ViewChildren('fav') fav;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public productService: ProductService ,
              public commonService : CommonService) {
    this.ProductID = this.navParams.data.ProductID ;
  }

  ionViewWillEnter()
  {
    this.productService.productDetails(this.ProductID).subscribe((res)=>{
      this.productDetails = res ;
      console.log(res);
    });
    this.customerService.getWishList().subscribe((res)=>{
      this.wishList = res;
      if(this.checkProductInFav(this.ProductID))
        this.fav._results[0].nativeElement.style.color = 'red' ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  checkProductInFav(ProductID : number)
  {
    return this.commonService.checkProductIsExistInFavorite(this.wishList , ProductID);
  }
  otherOffer(){
      this.navCtrl.push(OtherofferPage);
    }

  addToWishList(ProductID : number)
  {
    if(this.fav._results[0].nativeElement.style.color == 'red')
      this.removeFav(ProductID , this.fav._results[0].nativeElement);
    else
      this.addFav(ProductID , this.fav._results[0].nativeElement);
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
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
}
