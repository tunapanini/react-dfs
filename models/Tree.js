class Tree {
  constructor(root) {
    this.root = root;
  }

  *traverse(stackOrQueue) {
    const visited = [];
    stackOrQueue.push(this.root);

    yield { elements: stackOrQueue.elements, visited };
    while (!stackOrQueue.isEmpty()) {
      const current = stackOrQueue.pop();
      visited.push(current);
      yield { elements: stackOrQueue.elements, visited };
      if (current.children.length > 0) {
        current.children.forEach(child => stackOrQueue.push(child));
        yield { elements: stackOrQueue.elements, visited };
      }
    }
  }
}

export default Tree;
