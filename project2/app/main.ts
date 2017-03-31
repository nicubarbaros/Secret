
import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

// import './assets/stylesheets/Global';
import { bootstrap }    from '@angular/platform-browser-dynamic';
// Import App Component to be bootstrapped
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

