import {Component, ViewChildren} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {DetailsPage} from "../details/details";



@Component({
  selector: 'page-hotoffers',
  templateUrl: 'hotoffers.html',
})
export class HotoffersPage {
  public hotOffer : any ;
  public wishList : any ;
  @ViewChildren('productsIcon') elRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public productService : ProductService , public customerService : CustomerService ,
              public commonService : CommonService) {
  }
  ionViewWillEnter()
  {
    this.customerService.getWishList().subscribe((res)=>{
      this.wishList = res;
      this.getHotOffer();
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HotoffersPage');
  }
  checkProductInFav(ProductID : number)
  {
    return this.commonService.checkProductIsExistInFavorite(this.wishList , ProductID);
  }
  getHotOffer()
  {
    this.productService.hotOffer().subscribe((res)=>{
      this.hotOffer = res;
    });
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
  addToCart(ProductID : number , SellerID : number)
  {
    this.customerService.addToCart(ProductID , SellerID).subscribe((res)=>{
      if(res == true)
        this.commonService.successToast();
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
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
}
