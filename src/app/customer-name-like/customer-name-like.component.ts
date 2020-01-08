import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-name-like',
  templateUrl: './customer-name-like.component.html',
  styleUrls: ['./customer-name-like.component.css']
})
export class CustomerNameLikeComponent implements OnInit {

  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];
  submitted = false;

  newCustomer: Customer=new Customer();

  constructor(private customerService: CustomerService) { }

  ngOnInit() {  

  }

  get jsonCustomer(){
    return JSON.stringify(this.newCustomer);
  }

  onSubmit(c: Customer) {
    console.log("NameLike");
    console.log("Name"+this.newCustomer.name);
    console.log("c:Name"+c.name);
    this.submitted = true;

    this.customerService.nameLike(c.name).subscribe(
      res => {
       console.log(res);
       const returnText = res['body'].returnCode;
        
       if('0000'=== returnText){
         console.log("查詢成功");
         const body = res['body'];
         this.customers = body.dataList;
        
        }
      },errRes =>{
        console.log(errRes);
      }
    );

  }



}