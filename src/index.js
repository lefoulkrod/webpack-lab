import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import './style.css';
import { logo } from './logo/logo';
import { output } from './output/output.component';
import { error } from './error/error.component';


let origOutput = output;

const subscribeToClick = (elem, outputComp) => {
  return fromEvent(elem, 'click').pipe(
    map(event => `Last event time: ${event.timeStamp}`))
    .subscribe(val => outputComp.setValue(val));
};
document.body.appendChild(logo);
document.body.appendChild(output);
document.body.appendChild(error);

// create the button to lazy load.
const frag = document.createDocumentFragment();
const lazyContainer = document.createElement('div');
lazyContainer.innerHTML = `<button>Click me to lazy load.</button>`;
frag.appendChild(lazyContainer);
document.body.appendChild(lazyContainer);

lazyContainer.onclick = e => {
  e.stopPropagation();
  import(/* webpackChunkName: "LazyComponent" */ './lazy/lazy.component').then(module => {
    let lazyComponent = new module.LazyComponent();
    lazyComponent.mount(document.body);
  });
};

let subscription = subscribeToClick(document, output);

if (module.hot) {
  module.hot.accept('./output/output.component', function() {
    
    subscription.unsubscribe();
    const output = require('./output/output.component').output;
    document.body.replaceChild(output, origOutput);
    subscription = subscribeToClick(document, output);
    origOutput = output;
  });
}
