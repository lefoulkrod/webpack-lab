const button = document.createElement('button');
button.innerHTML = 'Click me for an error.';
button.addEventListener('click', () => {
  throw 'error'
});
export const error = button;