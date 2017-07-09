import { Component } from '@angular/core';
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  otherOffer(){
      this.navCtrl.push(OtherofferPage);
    }
  addToWishList(ProductID : number)
  {
    this.customerService.addToWishList(ProductID).subscribe((res)=>{
      if(res == true)
        this.commonService.successToast();
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
        this.commonService.errorToast();;
    });
  }
}
