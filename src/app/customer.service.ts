  
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

  customerId: String;
  name: String;
  addr: String;
  age: String;
  tel: String;
  newPage:String;
  customers: Customer[];


  public productsPerPage =4;
  public selectedPage=1;

  json: any={
              "header": {
                  "msgId": "1",
                  "txnSeq": "2",
                  "branchId": "3",
                  "clientIp": "4"
              },"body": {
                  "customerId": this.customerId,
                  "name": this.name,
                  "addr": this.addr,
                  "age": this.age,
                  "tel": this.tel
                  
                }
              };

  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  
  constructor(private http:HttpClient) { }

  public getUsers() {
  return this.http.get<Customer[]>('http://localhost:8080/customer/findAll');
  }

  public getCustomerByName(name : String){
    return this.http.get<Customer[]>('http://localhost:8080/customer/findByName');
  }


  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  public findOne(customerId : String){
    
    console.log("findOne拿到"+customerId);
    this.json["body"]["customerId"]=customerId;//給值

       // 透過 JSON.parse() 解析 JSON 字串
       let user = JSON.stringify(this.json);
       var newstr = user
  
       console.log("newstr"+newstr);
  
       var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/findSQL',objJsonArray,this.headers)
  }

  public createcustomer(name,addr,age,tel){

    console.log("createcustomer拿到"+name);
    this.json["body"]["name"]=name;//給值
    this.json["body"]["addr"]=addr;
    this.json["body"]["age"]=age;
    this.json["body"]["tel"]=tel;

    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(this.json);
    var newstr = user

    console.log("newstr"+newstr);

    var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/save2',objJsonArray,this.headers)

  }

  public updata(customerId,name,addr,age,tel){

    console.log("updata拿到"+customerId);
    this.json["body"]["customerId"]=customerId;//給值
    this.json["body"]["name"]=name;
    this.json["body"]["addr"]=addr;
    this.json["body"]["age"]=age;
    this.json["body"]["tel"]=tel;

    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(this.json);
    var newstr = user
  
    console.log("newstr"+newstr);
  
    var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/updata2',objJsonArray,this.headers);

  }



  public delet(customerId : String){

    console.log("delet拿到"+customerId);
    this.json["body"]["customerId"]=customerId;//給值

    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(this.json);
    var newstr = user

    console.log("newstr"+newstr);

    var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/deleteBySQL',objJsonArray,this.headers);
    
  }

  public login(name: string,tel: string){

    console.log("delet拿到"+name+"電話"+tel);
    this.json["body"]["name"]=name;//給值
    this.json["body"]["tel"]=tel;

     // 透過 JSON.parse() 解析 JSON 字串
     let user = JSON.stringify(this.json);
     var newstr = user

     console.log("newstr"+newstr);

     var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/login',objJsonArray
    ,this.headers);

  }


  public getAll(){
    return this.http.post<Customer[]>('http://localhost:8080/customer/page',this.json,this.headers);
  }

  public changePagetoEnd(newPage : String){

    console.log("changePagetoEnd"+newPage);
    this.json["body"]["newPage"]=newPage;//給值

     // 透過 JSON.parse() 解析 JSON 字串
     let user = JSON.stringify(this.json);
     var newstr = user

     console.log("newstr"+newstr);

     var objJsonArray =JSON.parse(newstr);

     return this.http.post('http://localhost:8080/customer/page2',objJsonArray
    ,this.headers);

  }


  public select(customerId,name,addr,age,tel){

    console.log("select拿到"+customerId);
    this.json["body"]["customerId"]=customerId.trim();//給值和去除空白
    this.json["body"]["name"]=name.trim();
    this.json["body"]["addr"]=addr.trim();
    this.json["body"]["age"]=age.trim();
    this.json["body"]["tel"]=tel.trim();

    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(this.json);
    var newstr = user
  
    console.log("newstr"+newstr);
  
    var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/findBySpecificColumn',objJsonArray,this.headers);

  }


  public nameLike(value: string){

    console.log("select拿到"+value);
   
    this.json["body"]["name"]=value; //給值
    
    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(this.json);
    var newstr = user
  
    console.log("newstr"+newstr);
  
    var objJsonArray =JSON.parse(newstr);

    return this.http.post('http://localhost:8080/customer/findByNameLike',objJsonArray,this.headers);

  }
  


  


}
