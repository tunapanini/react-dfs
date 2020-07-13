class Queue {
  constructor(...initialElements) {
    this.elements = [];
    initialElements.forEach(value => this.push(value));
  }

  push(value) {
    this.elements.push({ value, id: Queue.currentId });
    Queue.currentId += 1;
  }

  pop() {
    const firstValue = this.peek();
    if (firstValue) this.elements.shift();
    return firstValue;
  }

  peek() {
    return this.elements.length > 0 ? this.elements[0].value : null;
  }

  isEmpty() {
    return this.peek() === null;
  }
}

Queue.currentId = 1;

export default Queue;
