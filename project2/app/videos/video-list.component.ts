// Observable Version
import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { VideoService } from './video.service';
import { Video }              from './video';
// import '../assets/javascript/scrollview';

// declare function animate_elements(className);

@Component({
  selector: 'video-list',
  template: require('./video-list.component.html'),
  providers: [ VideoService ],
  directives: [ ROUTER_DIRECTIVES ]
})

export class VideoListComponent implements OnInit {
  errorMessage: string;
  videos: Video[];
  withStats: Video[];

  private className: string;
  private videosLength: number;

  constructor (private videoService: VideoService) {
    this.withStats = [];
  }

  ngOnInit() { 
    this.videosLength = 9;
    this.getVideos('');
    this.className = 'slide-in'
  }

  ngAfterViewChecked() {
    this.videoService.animate_elements(this.className);
  }

  private convertDate(date) {
    return this.videoService.convertDate(date);
  }

  private convertVideoDuration(duration) {
    return this.videoService.convertVideoDuration(duration);
  }
 
  private getVideos(token: string) {
    // we always want to start with an empty array
    // so that everytime will be only 9 elements
    this.withStats = [];
    this.videoService.getVideos(this.videosLength, token )
                     .subscribe(
                       videos => {
                          this.videos = videos;
                          for(let vid of videos['items']){
                            this.videoService.getVideosById(vid.snippet.resourceId.videoId)
                            .subscribe(video => this.withStats.push(video));
                            console.log("This video: ", vid.snippet.title);

                          }
                        },
                       error =>  this.errorMessage = <any>error);
  }
}
