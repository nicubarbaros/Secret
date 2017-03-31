import { provideRouter, RouterConfig } from '@angular/router';
import { BasketListComponent } from './basket.component';

// Route Configuration
export const BasketRoutes: RouterConfig = [
  { path: 'basket', component: BasketListComponent },
]
