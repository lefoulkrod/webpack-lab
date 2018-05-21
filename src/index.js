import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';
import './style.css';
import { logo } from './logo/logo';
import { output } from './output/output.component';
import { error } from './error/error.component';

const subscribeToClick = (elem, outputComp) => {
  return fromEvent(elem, 'click').pipe(
    map(event => `Last event time: ${event.timeStamp}`))
    .subscribe(val => outputComp.setValue(val));
};
let origOutput = output;
document.body.appendChild(logo);
document.body.appendChild(origOutput);
document.body.appendChild(error);

let subscription = subscribeToClick(document, origOutput);

if (module.hot) {
  module.hot.accept('./output/output.component', function() {
    
    subscription.unsubscribe();
    const output = require('./output/output.component').output;
    document.body.replaceChild(output, origOutput);
    subscription = subscribeToClick(document, output);
    origOutput = output;
  });
}
