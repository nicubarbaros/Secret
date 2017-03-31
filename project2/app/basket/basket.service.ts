import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, BrowserXhr } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import {Product} from '../products/product';
import { Item } from './item';

var END_POINTS = {
    CART: 'cart',
    ADD_TO_CART: 'add-to-cart',
    REMOVE_FROM_CART: 'remove-from-cart',
    PURCHASE: 'purchase'
};

@Injectable()
export class BasketService{
  private requestUrl = 'http://localhost:5000/';
  private headers = new Headers();

  constructor (private http: Http){
    this.headers.append('Content-Type', 'application/json');
  }

  // Get all items from the cart api
  getCart():Observable<Product[]>{
    let options = new RequestOptions({withCredentials: true});

    return this.http.get(this.requestUrl + END_POINTS.CART, options)
            .map(this.extractData)
            .catch(this.handleError)
  }

  // Add one item to cart, post request to api
  addToCart(type, id, quantity, size){
    let body = JSON.stringify({type: type, id: id, quantity: quantity, size:size});
    let options = new RequestOptions({ headers: this.headers, withCredentials :true});

     return this.http.post(this.requestUrl + END_POINTS.ADD_TO_CART, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  //Remove on item from cart, post request to the api
  removeFromCart(type, id, size){
    let body = JSON.stringify({type: type, id: id, size: size});
    let options = new RequestOptions({headers: this.headers, withCredentials: true});

    return this.http.post(this.requestUrl + END_POINTS.REMOVE_FROM_CART, body, options)
           .map(this.extractData)
           .catch(this.handleError);
  }

  // Buy all items from cart, post request to the api
  checkOut (item,  name, surname, phone, email):Observable<Item>{
    let body = JSON.stringify({item: item, name: name, surname: surname, phone: phone, email: email});
    this.headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: this.headers, withCredentials :true});

    return this.http.post(this.requestUrl + END_POINTS.PURCHASE, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();

    return body|| { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    
    return Observable.throw(errMsg);
  }
}

// This Custom class helpes to send Session Cookies to the server
@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor() {
    super();
  }

  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}