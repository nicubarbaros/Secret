import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductService{

  private requestUrl = 'http://localhost:5000/';
  private headers = new Headers();
  constructor (private http: Http){
  }

  getProducts(endPoint: string){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.requestUrl + endPoint, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getProductsById(endPoint: string, id:string){
    return this.http.get(this.requestUrl+ endPoint + "/" +id)
            .map(this.extractData)
            .catch(this.handleError);

  }
    private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);

  }
}