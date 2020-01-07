import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent implements OnInit {

  @ViewChild('customerIdInput') customerIdId: ElementRef;
  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('addrInput') addrId: ElementRef;
  @ViewChild('ageInput') ageId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];
  submitted = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

  }

  onSubmit(customerId: string,name: string,addr: string,age: string,tel: string) {
    console.log("selectcustomer");
    this.submitted = true;

    this.customerService.select( this.customerIdId.nativeElement.value,
      this.nameId.nativeElement.value,
      this.addrId.nativeElement.value,
      this.ageId.nativeElement.value,
      this.telId.nativeElement.value).subscribe(
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
