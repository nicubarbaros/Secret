import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router'

import { BasketService } from '../../basket/basket.service';
import { ProductService } from '../product.service';
import { Product }              from '../product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'accessory-details',
  template: require('./accessory-details.component.html'),
  providers: [ ProductService, BasketService ],
  directives: [ ROUTER_DIRECTIVES ]
})

export class AccessoryDetailsComponent implements OnInit {
  // Private properties for binding
  private errorMessage: string;
  private sub: any;
  private apiHostName: string;
  @Input() accessory:Product;

  constructor(private productService: ProductService, private basketService: BasketService, private route: ActivatedRoute) {
    this.apiHostName = 'http://localhost:5000'
  }

  // Load data ones componet is ready
  ngOnInit() {
    this.getAccessory();

  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  private addToCart(type: string, id:number, quantity: string, size: number){
    this.basketService.addToCart(type, id, parseInt(quantity),size).subscribe();
  }

  private getAccessory() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      let type = 'accessories';
      this.productService.getProductsById(type, id).subscribe(clothes => this.accessory = clothes);
    });
  }
}
