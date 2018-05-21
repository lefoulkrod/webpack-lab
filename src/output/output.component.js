import './output.css';

const span = document.createElement('span');
span.classList.add('output');
span.innerHTML = 'Hello world!  Click me to get started.';
span.setValue = function(val) {
  span.innerHTML = val;

}
export const output = span;

export let unused = function() { console.log('i do nothing.'); };