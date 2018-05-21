import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';
import './style.css';
import { logo } from './logo/logo';
import { output } from './output/output.component';
import { error } from './error/error.component';

document.body.appendChild(logo);
document.body.appendChild(output);
document.body.appendChild(error);

fromEvent(document, 'click').pipe(
  map(event => `Last event time: ${event.timeStamp}`))
  .subscribe(val => output.setValue(val));
