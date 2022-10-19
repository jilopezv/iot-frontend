import {Component} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
    <p-toast position="bottom-center"></p-toast>

  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;

  private subscription: Subscription;

  constructor(private messageService: MessageService, private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe("web_inbound").subscribe((message: IMqttMessage) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Message received from broker',
        detail: message.payload.toString(),
        sticky: true
      });
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
