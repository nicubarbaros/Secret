import { Injectable, Inject} from '@angular/core';
import { Http, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';

import { Channel } from './channel';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class HomeService{
  constructor (private http: Http) {}

  private videosUrl = 'http://localhost:5000/channel-info'; //URL to web API
  //this function will return an array of videos with length specified in function param
  getStatistics (): Observable<Channel[]> {
    return this.http.get(this.videosUrl)
            .map(this.extractData)
            .catch(this.handleError);
  }
 
  private extractData(res: Response) {
    let body = res.json();
    return body.items || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
}
