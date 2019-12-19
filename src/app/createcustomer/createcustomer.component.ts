import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';



import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {

  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('addrInput') addrId: ElementRef;
  @ViewChild('ageInput') ageId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];
  submitted = false;

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) { }
   
  ngOnInit() {

  }

  onSubmit(name: string,addr: string,age: string,tel: string) {
    console.log("createcustomer");
    this.submitted = true;

      this.customerService.createcustomer(this.nameId.nativeElement.value,
        this.addrId.nativeElement.value,
        this.ageId.nativeElement.value,
        this.telId.nativeElement.value).subscribe(
          res => {
           console.log(res);
           const returnText = res['body'].returnCode;
            
           if('0000'=== returnText){
             console.log("創建成功");
             this.router.navigate(['find-all']); // <-- 導向FindAllComponent
            }
          },errRes =>{
            console.log(errRes);
          }
        );
  }
     

}
