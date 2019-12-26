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
        this.user_photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' +window.atob(this.merchants[i]["pic"]));//解碼

        this.merchants[i]["pic"] = window.atob(this.merchants[i]["pic"]);//解碼64存回物件陣列
        
       }

      
      }
    })
     console.log("進入這頁面時發生");
  }

}
