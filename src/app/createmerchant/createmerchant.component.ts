import { Component, OnInit } from '@angular/core';
import { Merchant } from '../merchant';
import { MerchantService } from '../merchant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createmerchant',
  templateUrl: './createmerchant.component.html',
  styleUrls: ['./createmerchant.component.css']
})
export class CreatemerchantComponent implements OnInit {

  merchants: Merchant[];
  imgdata:string;

  merchantId: string;
  name: string;
  addr: string;
  tel: string;
  pic: string;
  submitted = false;

  image;

  newMerchant: Merchant=new Merchant();
  updateMerchant: Merchant=new Merchant();

  constructor(private merchantService: MerchantService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(m: Merchant) {
    console.log("Create Merchant");
    console.log("Name"+this.newMerchant.name);
    console.log("m:Name"+m.name);
    m.pic=this.pic;
    console.log("m:Pic"+m.pic);
    this.submitted = true;

    this.merchantService.createMerchant(m).subscribe(
      res => {
       console.log(res);
       const returnText = res['body'].returnCode;
        
       if('0000'=== returnText){
         console.log("新增成功");
         const body = res['body'];
         this.router.navigate(['merchant-find-all']); // <-- 導向merchant-find-all
        }
      },errRes =>{
        console.log(errRes);
      }
    );

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
