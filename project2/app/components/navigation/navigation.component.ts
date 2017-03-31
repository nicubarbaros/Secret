import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';



@Component({
  selector: 'navigation',
  template: require('./navigation.component.html'),
  directives: [ ROUTER_DIRECTIVES ]
})

export class NavigationComponent implements OnInit{
  ngOnInit() {}
}
