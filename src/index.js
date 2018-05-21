import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';
import './style.css';
import { logo } from './logo/logo';

document.body.appendChild(logo);

const output = document.createElement('span');
output.classList.add('output');
output.innerHTML = 'Hello world.  Click me to get started.';
document.body.appendChild(output);

fromEvent(document, 'click').pipe(
  map(event => `Last event time: ${event.timeStamp}`))
  .subscribe(val => output.innerHTML = val);
