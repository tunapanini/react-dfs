class Stack {
  constructor(...initialValues) {
    this.id = 1;
    this.elements = [];
    initialValues.forEach(value => this.push(value));
  }

  push(value) {
    this.elements.push({
      value,
      id: this.id
    });
    this.id += 1;
  }

  pop() {
    const lastValue = this.top();
    if (lastValue) this.elements.pop();
    return lastValue;
  }

  top() {
    if (this.elements.length > 0) {
      return this.elements[this.elements.length - 1].value;
    }
    return null;
  }

  isEmpty() {
    return this.top() === null;
  }
}

export default Stack;
