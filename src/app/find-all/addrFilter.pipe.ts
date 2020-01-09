//ch18p306
import { Pipe } from "@angular/core";
import { Customer } from '../customer';

@Pipe({
    name: "filter",
    pure: false
})
export class PaAddrFilterPipe {

    user_photo: string;

    transform(customers: Customer[], addr?: string): Customer[] {
        console.log("過濾地點"+addr);
        console.log("有在這裡"+customers);
        console.log("型別"+typeof(customers));
        console.dir(customers);
        //console.log(Object.keys(customers)); 

        return addr == undefined ? customers : customers.filter(
            function(custome){
                return custome.addr == addr;
            }
        );

    }

}