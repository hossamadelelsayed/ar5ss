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
import {MainService} from "../../providers/main-service";

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public category_id : number ;
  public category_name : string ;
  public categoryProducts : any ;
  public sortType : number  = this.productService.sortByASC;
  public CurrentPage : number = 1 ;
  public showing : string = 'list';
  public MainService : MainService = MainService ;
constructor(public navCtrl: NavController, public navParams: NavParams,
              public productService : ProductService , public customerService : CustomerService ,
              public commonService : CommonService) {
    if(this.navParams.data.category_id)
    {
      this.category_id = this.navParams.data.category_id;
      this.category_name = this.navParams.data.category_name;
    }

}

  ionViewWillEnter()
  {
        this.getcategoryProducts();
  }
  ionViewWillLeave(){
    console.log('deallocate');
    this.categoryProducts = [] ;
  }
  sortBy()
  {
    if(this.sortType == this.productService.sortByASC)
      this.sortType = this.productService.sortByDESC;
    else this.sortType = this.productService.sortByASC;
    this.getcategoryProducts();
  }
  getcategoryProducts()
  {
      this.productService.categoryProducts(this.category_id,this.CurrentPage,this.sortType).subscribe((res) => {
        this.categoryProducts = res.data;
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }
  addToWishList(ProductID : number , element:any)
  {
      if(element.style.color == 'crimson')
        this.removeFav(ProductID , element);
      else
        this.addFav(ProductID , element);
  }
  addFav(ProductID : number , element : any ) {
    element.style.color = 'crimson';
    this.customerService.addToWishList(ProductID).subscribe((res) => {
      if (res == true)
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }
  removeFav(ProductID : number , element : any)
  {
    element.style.color = 'darkgrey';
    this.customerService.deleteFav(ProductID).subscribe((res)=>{
      if (res.state == '202')
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }
  addToCart(ProductID : number , SellerID : number , element : any)
  {
    if(this.commonService.splitFromLastBackSlash(element.src) == 'cart_on.png')
      this.removeCart(ProductID , element);
    else
      this.addCart(ProductID , SellerID ,element);
  }
  addCart(ProductID : number , SellerID : number ,element : any ) {
    element.src = 'assets/imgs/cart_on.png';
    this.customerService.addToCart(ProductID , SellerID).subscribe((res)=>{
      if(res == true)
        this.commonService.successToast();
      else if(res.error)
        this.commonService.translateAndToast(res.error);
      else
        this.commonService.errorToast();
    });
  }
  removeCart(ProductID : number , element : any)
  {
    element.src = 'assets/imgs/cart_off.png';
    this.customerService.delCart(ProductID).subscribe((res)=>{
      if(res.state == '202')
        this.commonService.successToast();
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
  doInfinite(infiniteScroll)
  {
    this.CurrentPage++;
    this.productService.categoryProducts(this.category_id, this.CurrentPage, this.sortType).subscribe((products) => {
      infiniteScroll.complete();
      for (let i = 0 ; i < products.data.length ; i++)
      {
        this.categoryProducts.push(products.data[i]);
      }
    });
  }
}
