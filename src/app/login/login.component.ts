import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { e } from '@angular/core/src/render3';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  name: string;
  tel: string;
  submitted = false;

  constructor(private router:Router,private http:HttpClient,private customerService: CustomerService) { }

  ngOnInit() {
  }

  onSubmit(name: string,tel: string) {
    console.log("login");  
    this.submitted = true;
    this.customerService.login(this.name,this.tel).subscribe(
      res => {
        const returnText = res['body'].returnCode;
        if('0000'=== returnText){
          console.log("登入成功");
          this.router.navigate(['home']); // <-- 導向HomeComponent
          return;
        }else{
          console.log("無法登入");
          this.router.navigate(['login']); // <-- 導向LoginComponent
          return;
        }
      },errRes =>{
        console.log(errRes);
      }
    );

  }

}
