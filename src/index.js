import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import './style.css';
import { logo } from './logo/logo';
import { output } from './output/output.component';
import { error } from './error/error.component';

function replaceNode(tag, node) {
  const elem = document.getElementsByTagName(tag)[0];
  const parent = elem.parentNode;
  parent.replaceChild(node, elem);
}

const template = `
  <app-logo></app-logo>
  <app-output></app-output>
  <br/>
  <app-error></app-error>
  <br/>
  <button id="lazyButton">Click me to lazy load.</button>
`;
const appContainer = document.createElement('div');
appContainer.innerHTML = template;
document.body.appendChild(appContainer);
replaceNode('app-logo', logo);
replaceNode('app-output', output);
replaceNode('app-error', error);

let origOutput = output;
const subscribeToClick = (elem, outputComp) => {
  return fromEvent(elem, 'click').pipe(
    map(event => `Last event time: ${event.timeStamp}`))
    .subscribe(val => outputComp.setValue(val));
};

const lazyButton = document.getElementById('lazyButton');
lazyButton.onclick = e => {
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
