import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router'
import { SafeResourceUrl, DomSanitizationService, SafeUrl } from '@angular/platform-browser';

import { VideoService } from './video.service';
import { Video }              from './video';

@Component({
  selector: 'video-details',
  template: require('./video-details.component.html'),
	providers: [ VideoService ],
	directives: [ ROUTER_DIRECTIVES]
})

export class VideoDetailsComponent implements OnInit {
  // Private properties for binding
  errorMessage: string;
  private sub:any;
  video: Video;

  private dangerousVideoUrl: string = '';
  videoUrl: SafeResourceUrl;

	constructor(private videoService: VideoService, private route: ActivatedRoute, private sanitizer: DomSanitizationService) {
   this.updateVideoUrl('');
  }


  //Pass security for src tag
  updateVideoUrl(id: string) {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }

  // Load data ones componet is ready
  ngOnInit() {
    this.getVideos();
  }

  private getVideos() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.videoService.getVideosById(id).subscribe(video => this.video = video);
    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }
}
