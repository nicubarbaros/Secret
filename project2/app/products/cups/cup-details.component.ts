import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { BasketService } from '../../basket/basket.service';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'cup-details',
  template: require('./cup-details.component.html'),
  providers: [ ProductService, BasketService ],
  directives: [ ROUTER_DIRECTIVES ]
})

export class CupDetailsComponent implements OnInit {

  errorMessage: string;
  private sub: any;
  cup: Observable<Product>;
  type: string;
  apiHostName: string;
  selectedSpec: any;

  constructor(private productService: ProductService, private route: ActivatedRoute, private basketService: BasketService) {
    this.apiHostName = 'http://localhost:5000'
  }

  ngOnInit() {
    this.getCup();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  pickSpec(spec){
    this.selectedSpec = spec;
  }

  private addToCart(type, id, quantity, size){
    this.basketService.addToCart(type, id, parseInt(quantity),size).subscribe();
  }

  private getCup() {
    this.sub = this.route.params.subscribe(params => {
      let id = params ['id'];
      let type = 'cups';
      this.productService.getProductsById(type, id).subscribe(cup => {this.cup = cup;
                                                              this.pickSpec(cup.spec[0])});
    });
  }
}
