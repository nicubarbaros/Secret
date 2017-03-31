import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent }    from './home.component';

// Route Configuration
export const HomeRoutes: RouterConfig = [
  { path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent }

];



