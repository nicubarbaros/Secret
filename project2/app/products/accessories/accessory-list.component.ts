import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'accessory-list',
  template: require('./accessory-list.component.html'),
  directives: [ ROUTER_DIRECTIVES ]
})

export class AccessoryListComponent implements OnInit {

  ngOnInit(){}
}
