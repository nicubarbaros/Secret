import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { BasketService } from './basket.service';
import { Product } from '../products/product'
import {AccessoryDetailsComponent} from "../products/accessories/accessory-details.component";
import { Item } from './item';

import { CartForm } from '../components/cart-form/cart-form.component';

@Component({
  selector: 'basket-selector',
  template: require('./basket.component.html'),
  providers: [ BasketService ],
  directives: [ ROUTER_DIRECTIVES, AccessoryDetailsComponent, CartForm],
})

export class BasketListComponent implements OnInit {
  @Input()  cartItems: Product[];
  errorMessage: string;
  items: Item;
  apiHostName:string;

  constructor(private basketService:BasketService){
    this.apiHostName = 'http://localhost:5000'
  }

  ngOnInit(){
    this.getCartItems();
  }

  onChange(deviceValue, item) {
    item.quantity = deviceValue;
    this.addToCart(item.type, item.id, item.quantity, item.size);
  }

  private addToCart(type: string, id:number, quantity: string, size: number){
    this.basketService.addToCart(type, id, parseInt(quantity),size).subscribe();
  }
  
  getCartItems(){
   this.basketService.getCart()
       .subscribe(item => this.formatResult(item),
                  error =>  this.errorMessage = <any>error);
  }

  removeItem(type, id, size){
    this.basketService.removeFromCart(type, id, size)
        .subscribe();
  }

  pay(name, surname, phone, email){
    if (name && surname && (phone || email)) {
      this.basketService.checkOut(this.cartItems, name, surname, phone, email)
          .subscribe(item => {
                     this.items = item
                     this.cartItems= []
                        },
                     error =>  this.errorMessage = <any>error);
    }
  }


  deleteItem(item:Item){
    this.cartItems = this.cartItems.filter(cartItem=>cartItem.id!==item.id);
  }

  private formatResult(result) {
    this.cartItems = result;
  }
}
