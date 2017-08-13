import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductService} from "../../providers/product-service";

@IonicPage()
@Component({
  selector: 'page-allcategories',
  templateUrl: 'allcategories.html',
})
export class AllcategoriesPage {
  public category : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public productService : ProductService) {
  }
  ionViewWillEnter()
  {
    this.productService.category().subscribe((res)=>{
      this.category = res ;
      console.log(res);
    });
  }
  goToCategoryDetails(category_id : number , category_name : string)
  {
    this.navCtrl.push("CategoryPage",{
      category_id : category_id ,
      category_name : category_name
    })
  }
  goToFav()
  {
    this.navCtrl.push("WishlistPage");
  }
  goToCart()
  {
    this.navCtrl.push("ShoppingcartsPage");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllcategoriesPage');
  }

}
