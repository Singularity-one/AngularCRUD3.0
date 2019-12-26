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

}
