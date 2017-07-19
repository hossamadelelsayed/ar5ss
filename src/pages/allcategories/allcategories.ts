import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {CategoryPage} from "../category/category";


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
  goToCategoryDetails(category_id : number)
  {
    this.navCtrl.push(CategoryPage,{
      category_id : category_id
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllcategoriesPage');
  }

}
