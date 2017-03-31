import { Injectable, Inject} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Video } from './video';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment/moment';
// import 'moment/locale/ro';

@Injectable()
export class VideoService{

  private videosUrl = 'http://localhost:5000/videos'
  private headers = new Headers();
  private videos: any;
  // private locale: any;

  constructor (private http: Http) {
    // this.locale = moment().locale('ro');
  }

  //this function will return an array of videos with length specified in function param
  getVideos (length: number, token: string): Observable<Video[]> {
    let body = JSON.stringify({ max_results: length, page_token: token});
    this.headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.videosUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  getVideosById(id:string): Observable<Video>{
    return this.http.get(this.videosUrl+"/"+id)
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

  getNextVideos(length: number, currentPageToken:string, nextPageToken: string): Observable<Video[]> {
    let body = JSON.stringify({page_token: currentPageToken});
    this.headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.videosUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

 getIndexOf(currentId: string){
      if(this.videos){
        var index = this.videos.items.findIndex(video => video.id === currentId);
      }
  }

  convertDate(date){
    return moment(date).fromNow() 
  }

  convertVideoDuration(input) {
    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0, minutes = 0, seconds = 0, totalseconds;

    if (reptms.test(input)) {
      var matches = reptms.exec(input);
      if (matches[1]) hours = Number(matches[1]);

      if (matches[2]) {
        minutes = Number(matches[2]);
        if(minutes.toString().length < 2)
          minutes = this.pad(minutes, 2);
       }

      if (matches[3]) {
        seconds = Number(matches[3]);
        if(seconds.toString().length < 2)
          seconds = this.pad(seconds, 2);
      }
    }
    return hours == 0 ? minutes + ':' + seconds : hours + ":" + minutes + ":" + seconds;
  }

  //add number of zeros in front of a string
  private pad (str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }

 animate_elements(elementsClass) {
  var this_window = window
  var animation_elements = document.getElementsByClassName(elementsClass);
  // if(animation_elements.length == 0) 
  //   return;
  var that = this;
  //initiate the elements that are visible
  that.check_if_in_view(animation_elements);

  this_window.onscroll = function() {
    that.check_if_in_view(animation_elements);
  };
}

 private check_if_in_view(animation_elements) {
   var window_height = window.innerHeight;
   var window_scroll_y = window.pageYOffset;
   var window_height_with_scroll = (window_scroll_y + window_height);

   for (var a of animation_elements) {
     if(a.classList.contains('in-view'))
       continue;

     let rect = a.getBoundingClientRect().top;
     let doc = a.ownerDocument;
     let win = window;
     let docElem = doc.documentElement;

     var element_top_position = rect + win.pageYOffset - docElem.clientTop;

     //  //check to see if this current element is within viewport
     if (element_top_position <= window_height_with_scroll) {
       a.classList.add('in-view');
     } else {}
    }
  }
}
