import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'cup-list',
  template: require('./cup-list.component.html'),
  directives: [ ROUTER_DIRECTIVES ]
})

export class CupListComponent implements OnInit {

  ngOnInit(){}
}
