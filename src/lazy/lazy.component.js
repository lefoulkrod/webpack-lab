export class LazyComponent {
  constructor() {
    this.elemRef = document.createElement('div');
    this.elemRef.innerHTML = `I'm so lazy!!`;
  }

  mount(parentElem) {
    this.parentElemRef = parentElem;
    parentElem.appendChild(this.elemRef);
  }

  unmount() {
    this.parentElemRef.removeChild(this.elemRef);
    this.elemRef = null;
    this.parentElemRef = null;
  }
}