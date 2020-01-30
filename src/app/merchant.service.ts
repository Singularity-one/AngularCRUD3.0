import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Merchant } from './merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {  
  
  merchant: Merchant;

  merchantId: string;
  name: string;
  addr: string;
  tel: string;
  pic: string;
  merchants: Merchant[];

  constructor(private http:HttpClient) { }

  json: any={
    "header": {
        "msgId": "1",
        "txnSeq": "2",
        "branchId": "3",
        "clientIp": "4"
    },"body": {
        "merchantId": this.merchantId,
        "name": this.name,
        "addr": this.addr,
        "tel": this.tel,
        "pic": this.pic
        
      }
  };

  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  public getUsers() {
    return this.http.get<Merchant[]>('http://localhost:8080/merchant/findAll');
  }

  public createMerchant(m: Merchant){
    console.log("createMerchant");
    console.log("m:Name"+m.name);

    this.json["body"]["name"]=m.name;//給值
    this.json["body"]["addr"]=m.addr;
    this.json["body"]["tel"]=m.tel;
    this.json["body"]["pic"]=m.pic;

    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(this.json);
    var newstr = user

    console.log("newstr"+newstr);

    var objJsonArray =JSON.parse(newstr);  

    return this.http.post('http://localhost:8080/merchant/save3',objJsonArray,this.headers)

  }


}
