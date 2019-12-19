import { Component, OnInit, Output, EventEmitter, ElementRef, Pipe } from '@angular/core';
import { CustomerService } from '../customer.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-angular-updata',
  templateUrl: './angular-updata.component.html',
  styleUrls: ['./angular-updata.component.css']
  

})



export class AngularUpdataComponent implements OnInit {

  private _headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  submitted = false;
  pic:string;
  data:string;
  user_photo: SafeResourceUrl;
  show =false;
  showview =false;
  



  constructor(private router:Router,private http:HttpClient, private customerService: CustomerService,private sanitizer: DomSanitizer) {
    console.log("這是上傳圖片頁面");
   
  }


  ngOnInit() {   
  }


imageSrc;
sellersPermitFile: any;
ExteriorPicFile: any;
//base64s
sellersPermitString: string;
ExteriorPicString: string;
//json
finalJson = {};

currentId: number = 0;

addPictures() {
  this.finalJson = {
    "sellersPermitFile": this.ExteriorPicString,
    "ExteriorPicFile": this.ExteriorPicString
  }

  console.log(
    "圖"+this.sellersPermitString
   );


  let userJSON = {
    'header': {
      'msgId': '1',
      'txnSeq': '2',
      'branchId': '3',
      'clientIp': '4'
    },
    'body': {
      "merchantId": '2',
      'name': 'xxxx',
      'addr': '上海',
      'tel': '0999999',
      'pic':this.sellersPermitString
    }
  };

     // 透過 JSON.parse() 解析 JSON 字串
     let user = JSON.stringify(userJSON);
     var newstr = user

     console.log(
      "newstr"+newstr
     );

     var objJsonArray =JSON.parse(newstr);


   this.http.post('http://localhost:8080/merchant/save2',objJsonArray
  ,this._headers).subscribe(
               res => {
                console.log(res);
                 if(res['success']){
                   console.log("success");
                 }
                 const returnText = res['body'].returnCode;
                 if('0000'=== returnText){
                  console.log("上傳成功");

                  const body = res['body'];
                  this.data=body.pic;
                  console.log("路徑"+this.data);

                  this.user_photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' +this.data);
                  this.show=true;//點擊秀出全部
                  
  
                  this.router.navigate(['angular-updata']); // <-- 導向HomeComponent

                 }
               },errRes =>{
                 console.log(errRes);
               }
             );
}

public picked(event, field) {
  this.currentId = field;
  let fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    const file: File = fileList[0];
    if (field == 1) {
      this.sellersPermitFile = file;
      this.handleInputChange(file); //turn into base64
    }
  }
  else {
    alert("No file selected");
  }
}


handleInputChange(files) {
  var file = files;
  var pattern = /image-*/;
  var reader = new FileReader();
  if (!file.type.match(pattern)) {
    alert('invalid format');
    return;
  }
  reader.onloadend = this._handleReaderLoaded.bind(this);
  reader.readAsDataURL(file);
}
_handleReaderLoaded(e) {
  let reader = e.target;
  var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
  //this.imageSrc = base64result;
  let id = this.currentId;
  switch (id) {
    case 1:
      this.sellersPermitString = base64result;
      
      //上傳顯示
      this.user_photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.sellersPermitString);
      console.log("有到這裡"+this.user_photo);
      this.showview=true;//點擊秀出全部
      break;
  }
  this.log();
}

log() { 
  // for debug
  console.log('1', this.sellersPermitString);
}

  






}
