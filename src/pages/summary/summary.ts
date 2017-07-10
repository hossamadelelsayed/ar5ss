import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {AddlocationPage} from "../../pages/addlocation/addlocation";
import {CommonService} from "../../providers/common-service";
import {MainService} from "../../providers/main-service";
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";
import {CustomerService} from "../../providers/customer-service";
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  public userLocations : any[] ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public actionSheetCtrl :  ActionSheetController , public commonService : CommonService ,
              public payPal: PayPal , public customerService : CustomerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
  }
  ionViewWillEnter()
  {
    this.customerService.getUserLocation().subscribe((res)=>{
        this.userLocations = res ;
    });
  }
  goaddlocation(){
    this.navCtrl.push(AddlocationPage);
  }
  showUserLocations()
  {
    let buttons : any[] = [] ;
    for(let i = 0 ; i < this.userLocations.length ; i++) {
      let button =
        {
          text: this.userLocations[i].Place,
          icon: 'navigate',
          handler: () => {
            console.log('VISA');
          }
        };

      buttons.push(button);
      console.log(this.userLocations[i].Place)
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'dfh',
      cssClass: 'action-sheets-basic-page',
      buttons: buttons
    });
    actionSheet.present();
  }
  showPaymentMethod()
  {
    this.commonService.translateArray(
      ['Payment Method',
        'VISA',
        'MADA',
        'PAYPAL',
        'SADAD',
        'CASH']).subscribe((translatedArray : string[])=>{
      let actionSheet = this.actionSheetCtrl.create({
        title: translatedArray[0],
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: translatedArray[1],
            icon: 'cash',
            handler: () => {
              console.log('VISA');
            }
          },
          {
            text: translatedArray[2],
            icon: 'cash',
            handler: () => {
              console.log('MADA');
            }
          },
          {
            text: translatedArray[3],
            icon: 'cash',
            handler: () => {
              console.log('PAYPAL');
              this.payPalPayment('10');
            }
          },
          {
            text: translatedArray[4],
            icon: 'cash',
            handler: () => {
              console.log('SADAD');
            }
          },
          {
            text: translatedArray[5],
            icon: 'cash',
            handler: () => {
              console.log('CASH');
            }
          }
        ]
      });
      actionSheet.present();

    });
  }
  payPalPayment(amount : string)
  {
    this.payPal.init({
      PayPalEnvironmentProduction: MainService.payPalEnvironmentProduction ,//'YOUR_PRODUCTION_CLIENT_ID'
      PayPalEnvironmentSandbox: MainService.payPalEnvironmentSandbox//'YOUR_SANDBOX_CLIENT_ID'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(amount, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          // Successfully paid
          console.log(res);
          this.commonService.successToast();

        }, (res) => {
          // Error or render dialog closed without being successful
          console.log(res);
          this.commonService.presentToast('Error or render dialog closed without being successful');
        });
      }, (res) => {
        // Error in configuration
        console.log(res);
        this.commonService.presentToast('Error in configuration');
      });
    }, (res) => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log(res);
      this.commonService.presentToast('Error in initialization, maybe PayPal isnt supported or something else');
    });
  }

}
