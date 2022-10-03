class Element {
  constructor(type) {
    this.element = document.createElement(type);
  }

  css(propertyName, value) {
    this.element.style[propertyName] = value;
    return this;
  }
}

const div = new Element('div');
