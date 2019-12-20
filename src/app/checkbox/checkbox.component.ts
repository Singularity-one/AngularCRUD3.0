import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Merchant } from '../merchant';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('addrInput') addrId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;


  @ViewChild('addrEarth') earthId: ElementRef;
  @ViewChild('addrVenus') venusId: ElementRef;
  @ViewChild('addrMars') marsId: ElementRef;

  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  merchantId: string;
  name: string;
  addr: string;
  tel: string;
  merchants: Merchant[];
  submitted = false;

  earth: string;
  venus: string;
  mars: string;
  show =false; 

  earth2: string;
  venus2: string;
  mars2: string;
  

  showAddr(){ //點擊秀出全部
    this.show=true;
    if(this.earth){
      this.earth="earth,";
    }
   
    if(this.venus){
      this.venus="venus,"; 
    }

    if(this.mars){
      this.mars="mars,";
    }

    this.addr=''.concat(this.earth, this.venus, this.mars);;
    console.log(this.addr);
  }

  clear(){
    this.earth2=undefined;
    this.venus2=undefined; 
    this.mars2=undefined;
    this.addr=undefined;
  }

  onlyOne(){
    if(this.earth2){
      this.earth2="earth,";
      this.clear();
      
    }

    if(this.venus2){
      this.venus2="venus,"; 
      this.clear();
      
    }

    if(this.mars2){
      this.mars2="mars,";
      this.clear();
    }
  }

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) { }
   
  ngOnInit() {

  }


}
