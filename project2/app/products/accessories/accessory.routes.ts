import { provideRouter, RouterConfig } from '@angular/router';

import { AccessoryDetailsComponent } from './accessory-details.component';
import { AccessoryListComponent }    from './accessory-list.component';

// Route Configuration
export const AccessoryRoutes: RouterConfig = [
  { path: 'products/accessories', component: AccessoryListComponent },
  { path: 'products/accessory/:id', component: AccessoryDetailsComponent}
]
