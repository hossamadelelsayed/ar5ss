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
  addToWishList(ProductID : number)
  {
    this.customerService.addToWishList(ProductID).subscribe((res)=>{
      if(res == true)
      {
        this.commonService.successToast();
        let iconFilter :any ;
        iconFilter = this.elRef.toArray().filter((icon) => {
          return (icon.nativeElement.id == ProductID);
        });
        iconFilter.forEach( function (iconFiltered)
        {
          iconFiltered.nativeElement.style.color = 'red';
        });
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
  viewProduct(ProductID : number)
  {
    this.navCtrl.push(DetailsPage,{
      ProductID :ProductID
    });
  }

}
