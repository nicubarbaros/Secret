import { provideRouter, RouterConfig } from '@angular/router';

import { VideoListComponent }    from './video-list.component';
import { VideoDetailsComponent } from './video-details.component';

// Route Configuration
export const VideoRoutes: RouterConfig = [
  { path: 'videos', component: VideoListComponent },
  { path: 'video/:id', component: VideoDetailsComponent }
]
