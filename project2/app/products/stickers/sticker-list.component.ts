import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'sticker-list',
  template: require('./sticker-list.component.html'),
  directives: [ ROUTER_DIRECTIVES ]
})

export class StickerListComponent implements OnInit {

  ngOnInit(){}
}
