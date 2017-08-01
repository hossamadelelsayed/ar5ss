import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {AddlocationPage} from "../addlocation/addlocation";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";

/**
 * Generated class for the UserLocationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-locations',
  templateUrl: 'user-locations.html',
})
export class UserLocationsPage {
  public locations : any[];
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public viewCtrl : ViewController ,
              public commonService : CommonService) {
  }
  ionViewWillEnter()
  {
    this.customerService.getUserLocation().subscribe((res)=>{
      this.locations = res ;
    });
  }
  createLocation()
  {
    this.navCtrl.push(AddlocationPage);
  }
  selectLocation(LocationID)
  {
      this.viewCtrl.dismiss({
        LocationID : LocationID
      });
  }
  deleteUserLocation(LocationID : number)
  {
    this.delLocationFromArray(LocationID);
    this.customerService.deleteUserLocation(LocationID).subscribe((res)=>{
      if(res.stute == '202')
      this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }
  setDefaultLocation(LocationID : number){
    this.customerService.setDefaultLocation(LocationID).subscribe((res)=>{
      if(res)
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }
  delLocationFromArray(LocationID : number){
    let ArrayFilter :any[] ;
    ArrayFilter = this.locations.filter((item) => {
      return (item.LocationID != LocationID);
    });
    this.locations = ArrayFilter ;
  }
}
