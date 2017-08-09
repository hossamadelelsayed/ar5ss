import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  public wishList : any[] = [] ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService: CustomerService , public commonService : CommonService) {
  }


  ionViewWillEnter()
  {
    this.getWishList();
  }
  getWishList(){
    if(this.customerService.online)
      this.customerService.getWishList().subscribe((res)=>{
        this.wishList = res ;
      });
    else
    {
      this.customerService.getWishListOffline().subscribe((res)=>{
        console.log(res);
        for(let i = 0 ; i < res.rows.length ; i++)
        {
          this.wishList.push(res.rows.item(i));
        }
      })
    }
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
  addToCart(ProductID : number , SellerID : number)
  {
    this.customerService.addToCart(ProductID,SellerID).subscribe((res)=>{
      if(res == true)
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }
  viewProduct(ProductID : number)
  {
    this.navCtrl.push("DetailsPage",{
      ProductID :ProductID
    });
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }


}
