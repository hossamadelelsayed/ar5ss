import {Component, ViewChild} from '@angular/core';
import {NavController, IonicPage, Slides} from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {DomSanitizer} from "@angular/platform-browser";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {MainService} from "../../providers/main-service";
import {Geolocation} from "@ionic-native/geolocation";

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
  public cities : any[] ;
  public pageLang : string = MainService.lang;
  constructor(public navCtrl: NavController , public productService : ProductService ,
              private sanitizer: DomSanitizer , public customerService : CustomerService ,
              public commonService : CommonService , private barcodeScanner: BarcodeScanner ,
              private geolocation : Geolocation) {

    //setTimeout(()=> this.initObjects() , 6000);

  }
  initObjects(){
    this.getGroupShow();
      this.countCart();
    console.log('fired');
  }
  ionViewDidLoad()
  {
    this.productService.getCities().subscribe((res)=>{
      console.log('res res res res',res);
      this.cities = res ;
    });
    console.log("ion View Did Load");
    this.productService.hotads().subscribe((res)=>{
      this.hotads = res ;
      console.log("hot adds", this.hotads);
    });
   // this.initObjects();
  }
  ionViewWillEnter()
  {
    // if(this.pageLang != MainService.lang)
    //   this.initObjects();
    this.initObjects();
    //this.countCart();
  }
  countCart()
  {
    this.customerService.getCart().subscribe((cartRes)=>{
      this.cart = cartRes ;
      this.cartNo = this.cart.length ;
    });
  }
  ionViewWillUnload(){
    console.log('deallocate');
    this.groupShow = [] ;
  }
  getGroupShow()
  {
    this.productService.groupShow(this.customerService.cityName).subscribe((res:any)=>{
      this.groupShow = res ;
      //console.log(res);
     //console.log(this.groupShow);
    });
  }
  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  goToHotOffers(CategoryID : number , ProductID : number)
  {
    console.log('herere ' ,CategoryID , ProductID);
    if(CategoryID != 0 )
      this.navCtrl.push("CategoryPage",{
        category_id : CategoryID
      });
    else if(ProductID != 0 )
      this.navCtrl.push("DetailsPage",{
        ProductID : ProductID
    });
    else this.navCtrl.push("HotoffersPage");
  }
  gotosearch(){
    this.navCtrl.push("SearchPage");
  }
  addToWishList(ProductID : number, element:any , productObj ?: any )
  {
    if(element.style.color == 'crimson')
      this.removeFav(ProductID , element);
    else
      this.addFav(ProductID , element , productObj);
  }
  addFav(ProductID : number , element : any , productObj ?: any) {
    element.style.color = 'crimson';
      this.customerService.addToWishList(ProductID,productObj.product_name,productObj.Rate,productObj.Image,productObj.ProductPrice)
        .subscribe((res) => {
        if (res == true) {
          this.commonService.successToast();
        }
        // else
        //   this.commonService.errorToast();
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
  addToCart(ProductID : number , SellerID : number,element : any, productObj ?: any )
  {
    console.log(element);
    if(this.commonService.splitFromLastBackSlash(element.src) == 'cart_on.png')
      this.removeCart(ProductID , element);
    else
      this.addCart(ProductID , SellerID ,element,productObj);
  }
  addCart(ProductID : number , SellerID : number ,element : any , productObj ?: any  ) {
    element.src = 'assets/imgs/cart_on.png';
    if(!this.customerService.online)this.cartNo++; // update in later
    this.customerService.addToCart(ProductID , SellerID,productObj.product_name,productObj.Image,productObj.ProductPrice).subscribe((res)=>{
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
        if(this.cartNo != 0) this.cartNo--;
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
        if(this.groupShow[GroupIndex].Group.loadedNo == null)
          this.groupShow[GroupIndex].Group.loadedNo = 4 ;
        else
          this.groupShow[GroupIndex].Group.loadedNo ++;
        this.groupShow[GroupIndex].Products.push(products.data[i]);
      }
    });
  }
  goToGroupProducts(groupID : number , groupName : string){
    this.navCtrl.push("GroupProductsPage",{
      groupID : groupID ,
      groupName : groupName
    });
  }

}
