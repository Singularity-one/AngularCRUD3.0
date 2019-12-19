  
import { Injectable, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Customer } from './customer';
import { Observable } from 'rxjs';

const httpOptions ={ headers : new HttpHeaders({ 'Content-Type':'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer: Customer;

  customerId: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];

  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  
  constructor(private http:HttpClient) { }

  public getUsers() {
  return this.http.get<Customer[]>('http://localhost:8080/customer/findAll');
  }

  public getCustomerByName(name : String){
    return this.http.get<Customer[]>('http://localhost:8080/customer/findByName');
    //return this.http.post<Customer[]>('http://localhost:8080/customer/findByName',JSON.stringify(),);
  }


  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  findOne(customerId : String){
    
    let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        "customerId": customerId
      }
    };

       // 透過 JSON.parse() 解析 JSON 字串
       let user = JSON.stringify(userJSON);
       var newstr = user
  
       console.log(
        "newstr"+newstr
       );
  
       var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/findSQL',objJsonArray
    ,this.headers)
  }

  createcustomer(name,addr,age,tel){

    let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        'name': name,
        'addr': addr,
        'age': age,
        'tel': tel,
      }
    };

    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(userJSON);
    var newstr = user

    console.log(
     "newstr"+newstr
    );

    var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/save2',objJsonArray
    ,this.headers)

  }



  public delet(customerId : String){

    let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        "customerId": customerId
      }
    };

     // 透過 JSON.parse() 解析 JSON 字串
     let user = JSON.stringify(userJSON);
     var newstr = user

     console.log(
      "newstr"+newstr
     );

     var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/deleteBySQL',objJsonArray
    ,this.headers);
    
  }


}
