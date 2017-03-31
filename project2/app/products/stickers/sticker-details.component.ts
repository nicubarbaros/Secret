import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router'

import { BasketService } from '../../basket/basket.service'
import { ProductService } from '../product.service';
import { Product }              from '../product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sticker-details',
  template: require('./sticker-details.component.html'),
  providers: [ ProductService, BasketService ],
  directives: [ ROUTER_DIRECTIVES]
})

export class StickerDetailsComponent implements OnInit {
  // Private properties for binding
  errorMessage: string;
  private sub:any;
  sticker: Observable<Product>;
  type: string;
  apiHostName: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private basketService: BasketService) {
    this.apiHostName = 'http://localhost:5000'
  }

  // Load data ones componet is ready
  ngOnInit() {
    this.getSticker();
  }

  private addToCart(type, id, quantity, size){
      this.basketService.addToCart(type, id, parseInt(quantity),size).subscribe();
    }

  private getSticker() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      let type = 'stickers'
      this.productService.getProductsById(type, id).subscribe(sticker => this.sticker = sticker);
    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }
}
