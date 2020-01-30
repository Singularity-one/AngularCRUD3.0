import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { FindAllComponent } from './find-all/find-all.component';
import { UpdataComponent } from './updata/updata.component';

import { CustomerService } from './customer.service';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FindAllWithPageComponent } from './find-all-with-page/find-all-with-page.component';
import { PageComponent } from './page/page.component';
import { FindAllWithAgeComponent } from './find-all-with-age/find-all-with-age.component';
import { AngularUpdataComponent } from './angular-updata/angular-updata.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MerchantFindAllComponent } from './merchant-find-all/merchant-find-all.component';
import { SelectCustomerComponent } from './select-customer/select-customer.component';
import { CustomerNameLikeComponent } from './customer-name-like/customer-name-like.component';
import { PaStructureDirective } from './find-all/structure.directive';
import { PaAddrFilterPipe } from './find-all/addrFilter.pipe';
import { PaIteratorDirective } from './find-all/iterator.directive';
import { CreatemerchantComponent } from './createmerchant/createmerchant.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreatecustomerComponent,
    FindAllComponent,
    UpdataComponent,
    CustomerDetailsComponent,
    FindAllWithPageComponent,
    PageComponent,
    FindAllWithAgeComponent,
    AngularUpdataComponent,
    CheckboxComponent,
    MerchantFindAllComponent,
    SelectCustomerComponent,
    CustomerNameLikeComponent,
    PaStructureDirective, //ch16
    PaIteratorDirective,//ch16p260
    PaAddrFilterPipe, CreatemerchantComponent//ch18
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ], 
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
