import { provideRouter, RouterConfig } from '@angular/router';

import { CupListComponent }    from './cup-list.component';
import { CupDetailsComponent } from './cup-details.component';
// Route Configuration
export const CupRoutes: RouterConfig = [
  { path: 'products/cups', component: CupListComponent },
  { path: 'products/cup/:id', component: CupDetailsComponent }
]
