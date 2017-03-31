import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product';


@Component({
  selector: 'cloth-list',
  template: require('./clothes-list.component.html'),
  providers: [ ProductService ],
  directives: [ ROUTER_DIRECTIVES ]
})


export class ClothesListComponent implements OnInit {

  errorMessage: string;
  cloths: Observable<Product[]>;
  constructor (private productService: ProductService) {}

  ngOnInit(){}
}
