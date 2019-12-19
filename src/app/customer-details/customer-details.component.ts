import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';

import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];
  submitted = false;

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) {
      console.log("這是單筆資料頁面");
  }

 protected scustomeridSQLid2: string[] = [];

  ngOnInit() {
    this.scustomeridSQLid2 = this.customerService.messages;
    console.log("有接到值"+this.scustomeridSQLid2 );
    this.customerId =this.scustomeridSQLid2.toString();

    this.customerService.findOne(this.customerId).subscribe(
      res => {
        console.log(res);
          if(res['success']){
          console.log("success");
          }

        const returnText = res['body'].returnCode;
           if('0000'=== returnText){
              console.log("成功拿到單筆回傳");
              console.log(res);
              const body = res['body'];
              this.customers = body.dataList;
              console.log(this.customers);
            }
      },errRes =>{
      console.log(errRes);
      }
    );
    this.customerService.clear();//清除customerService中messages
  }

  list(){
    this.router.navigate(['find-all']); // <-- 導向FindAllComponent
  }

}
