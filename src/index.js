import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';

const div = document.createElement('div');
div.innerHTML = 'Hello world.  Click me to get started.';
document.body.appendChild(div);

fromEvent(document, 'click').pipe(
  map(event => `Last event time: ${event.timeStamp}`))
  .subscribe(val => div.innerHTML = val);
