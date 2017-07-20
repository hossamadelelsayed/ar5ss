import {Component, ElementRef, ViewChildren} from '@angular/core';
import { NavController } from 'ionic-angular';
import {SearchPage} from "../search/search";
import {ProductService} from "../../providers/product-service";
import {DomSanitizer} from "@angular/platform-browser";
import {HotoffersPage} from "../hotoffers/hotoffers";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {DetailsPage} from "../details/details";
import {ShoppingcartsPage} from "../shoppingcarts/shoppingcarts";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {CategoryPage} from "../category/category";
import {Profile}from "../profile/profile";
import {Settings} from "../settings/settings";
import {WishlistPage} from "../wishlist/wishlist";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hotads : any ;
  public groupShow : any ;
  public wishList : any ;
  public cartNo : number = 0 ;
  public productSearchResult : any[] ;
  public showSearch : boolean = false ;
  public KeyWord : string  ;
  @ViewChildren('productsIcon') elRef;
  constructor(public navCtrl: NavController , public productService : ProductService ,
              private sanitizer: DomSanitizer , public customerService : CustomerService ,
              public commonService : CommonService , private barcodeScanner: BarcodeScanner) {

    setTimeout(()=> this.initObjects() , 1000);
  }
  initObjects(){
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
    console.log('fired');
  }
  ionViewWillEnter()
  {
    this.initObjects();
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
    if(iconFilter[0].nativeElement.style.color == 'crimson')
      this.removeFav(ProductID , iconFilter[0].nativeElement);
    else
      this.addFav(ProductID , iconFilter[0].nativeElement);
  }
  addFav(ProductID : number , element : any ) {
    element.style.color = 'crimson';
    this.customerService.addToWishList(ProductID).subscribe((res) => {
      if (res == true) {
        this.commonService.successToast();
      }
      else
        this.commonService.errorToast();
    });
  }
  removeFav(ProductID : number , element : any)
  {
    element.style.color = 'darkgrey';
    this.customerService.deleteFav(ProductID).subscribe((res)=>{
      if (res.state == '202') {
            this.commonService.successToast();
          }
      else
        this.commonService.errorToast();
    });
  }
  addToCart(ProductID : number , SellerID : number)
  {
    this.customerService.addToCart(ProductID , SellerID).subscribe((res)=>{
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
  searchProduct(){
  if(this.KeyWord != ''){
      //this.commonService.presentLoading('Please Wait ...');
      this.showSearch = true ;
      this.productService.searchProduct(this.KeyWord).subscribe((res)=>{
        this.productSearchResult = res ;
        //this.commonService.dismissLoading();
      });
    }
    else
      this.showSearch = false ;
  }
  scan()
  {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      if(!barcodeData.cancelled){
        this.KeyWord = barcodeData.text ;
        this.searchProduct();
      }
    }, (err) => {
      // An error occurred
      console.log(err);
    });
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }

   opencat(){
    this.navCtrl.push(CategoryPage);
  }
  openfav(){
    this.navCtrl.push(WishlistPage);
  }
  openpro(){
    this.navCtrl.push(Profile);
  }
  opensett(){
    this.navCtrl.push(Settings)
  }
}
