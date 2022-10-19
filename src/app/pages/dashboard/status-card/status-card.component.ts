import { Component, Input } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="toggle()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

  constructor(private messageService: MessageService) {
  }

  toggle(){
    this.on = !this.on
    this.messageService.add({severity:'error', summary:'toggle', detail:'State has changed'});

  }
}
