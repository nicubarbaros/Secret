import { Component, OnInit,  AfterViewChecked} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Channel } from './channel';
import { HomeService } from './home.service';
import { Video } from '../videos/video'
import { VideoService } from '../videos/video.service';
import { VideoListComponent } from '../videos/video-list.component';
import { Observable } from 'rxjs/Observable';
//import User = require('../assets/javascript/scrollview');

// import '../assets/javascript/scrollview'
//var foo = require('../assets/javascript/scrollview');
// declare function animate_elements(className);

@Component ({
  template: require('./home.component.html'),
  providers: [ HomeService, VideoService ],
  directives: [ VideoListComponent, ROUTER_DIRECTIVES],
})

export class HomeComponent implements OnInit {

  errorMessage: string;
  items: Channel[];
  videos: Video[];
  withStats: Video[];

  private videosLength: number;
  private className: string;

  constructor (private homeService: HomeService, private videoService: VideoService){}

  ngOnInit() {
    this.videosLength = 8;
    this.getChannelInfo();
    this.getVideos();
    this.withStats = [];
    this.className = 'slide-in';
  }

  ngAfterViewChecked() {
    // slide in animation
    this.videoService.animate_elements(this.className);
  } 

  private convertDate(date) {
    return this.videoService.convertDate(date);
  }

  private convertVideoDuration(duration) {
    return this.videoService.convertVideoDuration(duration);
  }

  private getChannelInfo(){
    this.homeService.getStatistics().subscribe(
                     items => this.items = items,
                     error => this.errorMessage = <any>error);
  }

   private getVideos(){
    this.videoService.getVideos(this.videosLength, '' )
                      .subscribe(
                        videos => {
                          this.videos = videos;
                          for(let vid of videos['items']){
                            this.videoService.getVideosById(vid.snippet.resourceId.videoId).subscribe(video => this.withStats.push(video));
                          };
                        },
                        error =>  this.errorMessage = <any>error);
  }



}
