import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router'

import { BasketService } from '../../basket/basket.service';
import { ProductService } from '../product.service';
import { Product }              from '../product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'clothes-details',
  template: require('./clothes-details.component.html'),
  providers: [ ProductService, BasketService ],
  directives: [ ROUTER_DIRECTIVES ]
})

export class ClothesDetailsComponent implements OnInit {
  // Private properties for binding
  errorMessage: string;
  private sub: any;
  selectedSpec: any;
  sizeOptions: any;
  clothing: Observable<Product>;
  type: string;
  apiHostName: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private basketService: BasketService) {
    this.apiHostName = 'http://localhost:5000'
  }

  // Load data ones componet is ready
  ngOnInit() {
    this.getClothes();
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  pickSpec(spec){
    this.selectedSpec = spec;
    this.sizeOptions = spec.size.split(",");
  }

  private addToCart(type, id, quantity, size){
    this.basketService.addToCart(type, id, parseInt(quantity),size).subscribe();
  }

  private getClothes() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      let type = 'clothes';
      this.productService.getProductsById(type, id).subscribe(clothes =>
        {
          this.clothing = clothes;
          if(clothes.specs.length > 0){
             this.pickSpec(clothes.specs[0]);
           }
         });
    });
  }
}
