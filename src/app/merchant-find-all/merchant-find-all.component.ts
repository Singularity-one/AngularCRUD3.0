import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { Merchant } from '../merchant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-merchant-find-all',
  templateUrl: './merchant-find-all.component.html',
  styleUrls: ['./merchant-find-all.component.css']
})
export class MerchantFindAllComponent implements OnInit {

  user_photo: SafeResourceUrl;
  merchants: Merchant[];
  imgdata:string;

  merchantId: string;
  name: string;
  addr: string;
  tel: string;
  pic: string;
  submitted = false;

  image;
  updateMerchant: Merchant=new Merchant();

  constructor(private merchantService: MerchantService,private sanitizer: DomSanitizer) { }

  ngOnInit() { 
    
    this.merchantService.getUsers().subscribe( data =>{
      this.merchants =data;
      console.log(data);
      const returnText = data['body'].returnCode;
      if('0000'=== returnText){
       console.log("讀入全部資料");
       const body = data['body'];
       this.merchants = body.dataList;   

       var i;
       for(i=0;i<this.merchants.length;i++){
        var j=i.toString();
        //this.merchants[i]["pic"] = window.atob(this.merchants[i]["pic"]);//解碼
        //this.user_photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' +window.atob(this.merchants[i]["pic"]));//解碼

        this.merchants[i]["pic"] = window.atob(this.merchants[i]["pic"]);//解碼64存回物件陣列
        
       }

      
      }
    })
     console.log("進入這頁面時發生");
  }

  updateMerchants(merchantId: string,name: string,addr: string,tel: string){
    console.log("updateMerchants");
    console.log("umerchantId:"+merchantId);
    this.updateMerchant.merchantId=merchantId
    this.updateMerchant.name=name
    this.updateMerchant.addr=addr
    this.updateMerchant.tel=tel
    this.updateMerchant.pic=this.pic
    this.merchantService.updateMerchants(this.updateMerchant).subscribe(
      res => {
       console.log(res);
       const returnText = res['body'].returnCode;
        
       if('0000'=== returnText){
         console.log("新增成功");
         const body = res['body'];
         this.ngOnInit(); 
        }
      },errRes =>{
        console.log(errRes);
      }
    );//傳給merchantService

  }

  upload($event) : void {
    console.log("路徑"+$event.target.value);
    console.log(typeof($event.target.files[0]));//型別
    this.readThis($event.target);

  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;//轉64編碼
      this.pic=this.image.replace("data:image/png;base64,", "");//去除前面data:image/png;base64,
    }
    myReader.readAsDataURL(file);
  }


}
