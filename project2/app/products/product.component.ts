import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';

@Component ({
  selector: 'products-selector',
  template: require('./product.component.html'),
  providers: [ ProductService ],
  directives: [ ROUTER_DIRECTIVES]
})

export class ProductComponent implements OnInit {

  errorMessage: string;
  products: Observable<Product[]>;
  apiHostName: string;
  sortable = [];
  constructor (private productService: ProductService) {
  }
  ngOnInit() {
    this.apiHostName = 'http://localhost:5000';
    this.getProductsList();
  }

  private getProductsList(){
    this.productService.getProducts('products')
         .subscribe(products => this.formatResult(products),
                    error => this.errorMessage = <any>error);
  }

  private formatResult(result) {
        this.products = result;
    }
}
