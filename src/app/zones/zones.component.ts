import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ZonesComponent {

  webapi = {
    'click': {
      callstack: [
        this.zone(
          this.handler('click',
            this.timeout('setTimeout', this.return()),
            this.return(),
          ),
          this.call('detect changes', this.return()),
          this.return(),
        ),

      ]
    },
    'timeout': {
      callstack: [
        this.zone(
          this.handler('timeout',
            this.return(),
          ),
          this.call('detect changes', this.return()),
          this.return(),
        ),

      ]
    },
  };
  webapis = Object.getOwnPropertyNames(this.webapi);

  callbackQueue = [];

  callStack = [];
  nextCalls: any[] = null;

  constructor() { }

  onApiClick(api: string) {
    this.callbackQueue.push(api);
  }

  dequeue() {
    this.callStack = [];
    this.nextCalls = this.webapi[this.callbackQueue.shift()].callstack.slice();
    this.onStep();
  }

  onStep() {
    if (this.nextCalls && this.nextCalls.length) {
      const nextCall = this.nextCalls.shift();
      const nextStack = nextCall();
      if (nextStack.length) {
        this.nextCalls.unshift(...nextStack);
      }
    } else if (this.callStack.length) {
      this.callStack.shift();
    } else if (this.callbackQueue.length) {
      this.dequeue();
    }
  }

  zone(...calls) {
    return () => {
      this.callStack.unshift('zone');
      return calls;
    };
  }

  handler(name, ...calls) {
    return () => {
      this.callStack.unshift('handler: ' + name);
      return calls;
    };
  }

  timeout(name, ...calls) {
    return () => {
      setTimeout(() => {
        this.onApiClick('timeout');
      }, 10000);
      this.callStack.unshift('api: ' + name);
      return calls;
    };
  }

  call(name, ...calls) {
    return () => {
      this.callStack.unshift(name);
      return calls;
    };
  }

  return() {
    return () => {
      this.callStack.shift();
      return [];
    };
  }

}
