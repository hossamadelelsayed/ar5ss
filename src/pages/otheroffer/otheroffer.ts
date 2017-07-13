import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonService} from "../../providers/common-service";
import {CustomerService} from "../../providers/customer-service";


@Component({
  selector: 'page-otheroffer',
  templateUrl: 'otheroffer.html',
})
export class OtherofferPage {

  public CategoryID : number ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public commonService : CommonService , public customerService : CustomerService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherofferPage');
  }
  ionViewWillEnter()
  {
    this.customerService.getRelatedProduct(this.CategoryID).subscribe((res)=>{

    });
  }

}
