import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';
import './style.css';
import { logo } from './logo/logo';
import { output } from './output/output.component';
import { error } from './error/error.component';

let origOutput = output;
document.body.appendChild(logo);
document.body.appendChild(origOutput);
document.body.appendChild(error);

let subscription = fromEvent(document, 'click').pipe(
  map(event => `Last event time: ${event.timeStamp}`))
  .subscribe(val => origOutput.setValue(val));

if (module.hot) {
  module.hot.accept('./output/output.component', function() {
    document.body.removeChild(origOutput);
    subscription.unsubscribe();
    const output = require('./output/output.component').output;
    document.body.appendChild(output);
    subscription = fromEvent(document, 'click').pipe(
      map(event => `Last event time: ${event.timeStamp}`))
      .subscribe(val => output.setValue(val));
    origOutput = output;
  });
}
