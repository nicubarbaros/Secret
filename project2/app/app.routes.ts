// ====== ./app/app.routes.ts ======

// Imports
import { provideRouter, RouterConfig } from '@angular/router';
import { AccessoryRoutes } from './products/accessories/accessory.routes';
import { BasketRoutes } from './basket/basket.routes';
import { ClothRoutes } from './products/clothes/clothes.routes';
import { CupRoutes } from './products/cups/cup.routes';
import { HomeRoutes } from './home/home.routes';
import { ProductRoutes } from './products/product.routes';
import { StickerRoutes } from './products/stickers/sticker.routes';
import { VideoRoutes } from './videos/video.routes';


// Route Configuration
export const routes: RouterConfig = [
  ...HomeRoutes,
  ...VideoRoutes,
  ...ProductRoutes,
  ...AccessoryRoutes,
  ...ClothRoutes,
  ...CupRoutes,
  ...StickerRoutes,
  ...BasketRoutes
];

// Export routes
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

