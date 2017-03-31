import { provideRouter, RouterConfig } from '@angular/router';

import { ClothesListComponent }    from './clothes-list.component';
import { ClothesDetailsComponent } from './clothes-details.component';

// Route Configuration
export const ClothRoutes: RouterConfig = [
  { path: 'products/clothes', component: ClothesListComponent },
  { path: 'products/clothing/:id', component: ClothesDetailsComponent}
]
