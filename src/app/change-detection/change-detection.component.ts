import {
  Component, DoCheck, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

declare var global_clearTimeout: any;
declare var global_setTimeout: any;

let counter = 0;
let initialized = false;

let inOrderCheck = [];
let inOrderRemove = [];

function scheduleOne() {
  initialized = false;
  const previousEl = inOrderCheck.shift();
  previousEl.classList.add('red');
  inOrderRemove.push(previousEl);
  const currentEl = inOrderCheck[0];
  if (currentEl) {
    currentEl.classList.add('yellow');
    global_setTimeout(scheduleOne, 1000);
  }
}

function clearElements() {
  for (const el of inOrderRemove) {
    el.classList.remove('red', 'yellow');
  }
}

@Component({
  selector: 'app-change-detection',
  template: `
    <div #el class="box green" (click)="onClick()">{{id}}</div>

    <app-change-detection *ngFor="let child of childs" [childs]="child"></app-change-detection>
  `,
  styleUrls: ['./change-detection.component.css'],
})
export class ChangeDetectionComponent implements DoCheck, OnDestroy {

  @Input() childs: any[];
  cleanup = new Subject();
  id = ++counter;
  @ViewChild('el') el: ElementRef;

  constructor() {
  }

  ngOnDestroy() {
    counter--;
  }

  onClick() {
    initialized = true;
  }

  ngDoCheck() {
    if (initialized) {
      if (!inOrderCheck.length) {
        clearElements();
        global_setTimeout(scheduleOne, 0);
        inOrderCheck.push(this.el.nativeElement);
      }
      inOrderCheck.push(this.el.nativeElement);
    }
  }

}

@Component({
  selector: 'app-change-detection-on-push',
  template: `
    <div #el class="box green" (click)="onClick()">{{id}}</div>

    <app-change-detection-on-push *ngFor="let child of childs" [childs]="child"></app-change-detection-on-push>
  `,
  styleUrls: ['./change-detection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionOnPushComponent extends ChangeDetectionComponent {
}
