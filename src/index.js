import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';
import './style.css';
import Logo from './logo.png';

const img = new Image();
img.classList.add('logo');
img.src = Logo;
document.body.appendChild(img);

const output = document.createElement('span');
output.classList.add('output');
output.innerHTML = 'Hello world.  Click me to get started.';
document.body.appendChild(output);

fromEvent(document, 'click').pipe(
  map(event => `Last event time: ${event.timeStamp}`))
  .subscribe(val => output.innerHTML = val);
