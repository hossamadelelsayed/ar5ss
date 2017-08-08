import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {DomSanitizer} from "@angular/platform-browser";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {MainService} from "../../providers/main-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hotads : any ;
  public groupShow : any[] ;
  public cart : any[] = [] ;
  public cartNo : number = 0 ;
  public productSearchResult : any[] ;
  public showSearch : boolean = false ;
  public KeyWord : string  ;
  public MainService : MainService =  MainService ;
  constructor(public navCtrl: NavController , public productService : ProductService ,
              private sanitizer: DomSanitizer , public customerService : CustomerService ,
              public commonService : CommonService , private barcodeScanner: BarcodeScanner) {

    //setTimeout(()=> this.initObjects() , 1000);
  }
  initObjects(){
    this.getGroupShow();
    this.productService.hotads().subscribe((res)=>{
      this.hotads = res ;
    });
    this.customerService.getCart().subscribe((cartRes)=>{
      this.cart = cartRes ;
      this.cartNo = this.cart.length ;
    });
    console.log('fired');
  }
  ionViewWillEnter()
  {
    this.initObjects();
  }
  ionViewWillLeave(){
    console.log('deallocate');
    this.groupShow = [] ;
  }
  getGroupShow()
  {
    this.productService.groupShow().subscribe((res)=>{
      this.groupShow = res ;
      console.log(this.groupShow);
    });
  }
  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  goToHotOffers()
  {
    this.navCtrl.push("HotoffersPage");
  }
  gotosearch(){
    this.navCtrl.push("SearchPage");
  }

  addToWishList(ProductID : number,element:any)
  {
    if(element.style.color == 'crimson')
      this.removeFav(ProductID , element);
    else
      this.addFav(ProductID , element);
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
  addToCart(ProductID : number , SellerID : number,element : any)
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
  removeCart(ProductID : number , element : any)
  {
    element.src = 'assets/imgs/cart_off.png';
    this.customerService.delCart(ProductID).subscribe((res)=>{
      if(res.state == '202')
      {
        this.commonService.successToast();
        this.cartNo--;
      }
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
  goToCart()
  {
    this.navCtrl.push("ShoppingcartsPage");
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
    this.navCtrl.push("CategoryPage");
  }
  openfav(){
    this.navCtrl.push("WishlistPage");
  }
  openpro(){
    this.navCtrl.push("Profile");
  }
  opensett(){
    this.navCtrl.push("Settings");
  }
  loadNext(GroupShowID : number)
  {
    let GroupIndex : number ;
    for(GroupIndex = 0 ; GroupIndex < this.groupShow.length ; GroupIndex++)
    {
      if(this.groupShow[GroupIndex].Group.GroupShowID == GroupShowID)
      {
        if(this.groupShow[GroupIndex].Group.CurrentPage != null)
        {
          this.groupShow[GroupIndex].Group.CurrentPage++   ;
          console.log('yes added');
        }
        else
          this.groupShow[GroupIndex].Group.CurrentPage = 2 ;
        break ;
      }
    }
    this.paginateAndRender(GroupShowID ,this.groupShow[GroupIndex].Group.CurrentPage ,GroupIndex);
    console.log('load');
  }
  paginateAndRender(GroupShowID : number ,CurrentPage : number ,GroupIndex : number)
  {
    //this.commonService.presentLoading('Please Wait');
    // setTimeout(() => {
    //   this.commonService.dismissLoading();
    // }, 250);
    this.productService.groupProductPaginate(GroupShowID,CurrentPage).subscribe((products)=>{
      for (let i = 0 ; i < products.data.length ; i++)
      {
        this.groupShow[GroupIndex].Products.push(products.data[i]);
      }
    });
  }
}
