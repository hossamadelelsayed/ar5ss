import {Component, ViewChildren} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AllcategoriesPage} from "../allcategories/allcategories";
import {HotoffersPage} from "../hotoffers/hotoffers";
import {WishlistPage} from "../wishlist/wishlist";
import {EmptyhistoryPage} from "../emptyhistory/emptyhistory";
import {SearchPage} from "../search/search";
import {ProductService} from "../../providers/product-service";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {DetailsPage} from "../details/details";
import {Profile}from "../profile/profile";
import {Settings} from "../settings/settings";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public category_id : number ;
  public categoryProducts : any ;
  public wishList : any ;
  public sortType : number  = this.productService.sortByASC;
  public showing : string = 'list';
  @ViewChildren('productsIcon') elRef;
  @ViewChildren('productsIcon2') elRef2;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public productService : ProductService , public customerService : CustomerService ,
              public commonService : CommonService) {
    if(this.navParams.data.category_id)
      this.category_id = this.navParams.data.category_id;
}

  ionViewWillEnter()
  {
    this.getWishList();
  }
  sortBy()
  {
    if(this.sortType == this.productService.sortByASC)
      this.sortType = this.productService.sortByDESC;
    else this.sortType = this.productService.sortByASC;
    this.getcategoryProducts();
  }
  getWishList()
  {
    this.customerService.getWishList().subscribe((res)=>{
      this.wishList = res;
      this.getcategoryProducts();
    });
  }
  checkProductInFav(ProductID : number)
  {
     return this.commonService.checkProductIsExistInFavorite(this.wishList , ProductID);
  }
  getcategoryProducts()
  {
    if(this.category_id)
    {
      this.productService.categoryProducts(this.category_id,this.sortType).subscribe((res) => {
        this.categoryProducts = res;
      });
    }
    else
    {
      this.productService.groupShow().subscribe((res)=>{
        this.categoryProducts = res[0].product  ;
        console.log(this.categoryProducts);
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }
  addToWishList(ProductID : number)
  {
    let iconFilter :any[] = [] ;
    iconFilter = this.elRef.toArray().filter((icon) => {
      return (icon.nativeElement.id == ProductID);
    });
    for(let i = 0 ; i < iconFilter.length ; i++)
    {
      if(iconFilter[i].nativeElement.style.color == 'crimson')
        this.removeFav(ProductID , iconFilter[i].nativeElement);
      else
        this.addFav(ProductID , iconFilter[i].nativeElement);
    }


    let iconFilter2 :any[] = [];
    iconFilter2 = this.elRef2.toArray().filter((icon) => {
      return (icon.nativeElement.id == ProductID+'2');
    });
    for(let i = 0 ; i < iconFilter2.length ; i++)
    {
      if(iconFilter2[i].nativeElement.style.color == 'crimson')
        this.removeFav(ProductID , iconFilter2[i].nativeElement);
      else
        this.addFav(ProductID , iconFilter2[i].nativeElement);
    }
  }
  addFav(ProductID : number , element : any ) {
    this.customerService.addToWishList(ProductID).subscribe((res) => {
      if (res == true) {
        this.commonService.successToast();
        element.style.color = 'crimson';
        this.getWishList();
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
        this.getWishList();
      }
      else
        this.commonService.errorToast();
    });
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
  gotoall(){
    this.navCtrl.push(AllcategoriesPage);
  }
  gotohot(){
    this.navCtrl.push(HotoffersPage)
  }
  gotowish(){
    this.navCtrl.push(WishlistPage);
  }
  gotohistory(){
    this.navCtrl.push(EmptyhistoryPage);
  }
  gotosearch(){
    this.navCtrl.push(SearchPage);
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



   openhome(){
     this.navCtrl.push(HomePage)
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
