import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {DetailsPage} from "../details/details";



@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  public wishList : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService: CustomerService , public commonService : CommonService) {
  }


  ionViewWillEnter()
  {
    this.getWishList();
  }
  getWishList(){
    this.customerService.getWishList().subscribe((res)=>{
      this.wishList = res ;
      console.log(this.wishList);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }
  deleteWishlist(favoritID : number)
  {
    this.customerService.deleteWishlist(favoritID).subscribe((res)=>{
      if(res.stats == 'done')
      {
        this.commonService.successToast();
        this.getWishList();
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
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
}
