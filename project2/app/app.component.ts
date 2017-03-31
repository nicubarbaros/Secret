import { Component } from '@angular/core';
import './rxjs-operators';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import './assets/stylesheets/scss/base.scss';

import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  selector: 'duck-show',
  template: require('./app.component.html'),
  directives: [ NavigationComponent, ROUTER_DIRECTIVES, FooterComponent]
})

export class AppComponent{
  title = 'The Duck Show';
}

