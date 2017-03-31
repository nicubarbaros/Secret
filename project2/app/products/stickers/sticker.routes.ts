import { provideRouter, RouterConfig } from '@angular/router';

import { StickerListComponent }    from './sticker-list.component';
import { StickerDetailsComponent }    from './sticker-details.component';
// Route Configuration
export const StickerRoutes: RouterConfig = [
  { path: 'products/stickers', component: StickerListComponent },
  { path: 'products/sticker/:id', component: StickerDetailsComponent }
]
