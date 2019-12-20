import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updata',
  templateUrl: './updata.component.html',
  styleUrls: ['./updata.component.css']
})
export class UpdataComponent implements OnInit {

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

  placeholderText='xxx';

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) {
        console.log("這是修改頁面");
   }

  protected scustomeridSQLid2: string[] = [];


  ngOnInit() {

    this.scustomeridSQLid2 = this.customerService.messages;
    console.log("有接到值"+this.scustomeridSQLid2 );

    this.customerId =this.scustomeridSQLid2.toString();
    this.customerService.findOne(this.customerId).subscribe(
        res => {
          console.log(res);
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
    //this.customerService.clear();//清除customerService中massage(無法用,因為必須修改後傳入後端)
  }

  onSubmit(customerId: string,name: string,addr: string,age: string,tel: string) {
    console.log("updatacustomer");
    this.submitted = true;

    this.customerService.updata(this.scustomeridSQLid2.toString(),
      this.nameId.nativeElement.value,
      this.addrId.nativeElement.value,
      this.ageId.nativeElement.value,
      this.telId.nativeElement.value).subscribe(
      res => {
       console.log(res);
       const returnText = res['body'].returnCode;
        
       if('0000'=== returnText){
         console.log("修改成功");
         this.router.navigate(['find-all']); // <-- 導向FindAllComponent
        }
      },errRes =>{
        console.log(errRes);
      }
    );

  }
     

}
