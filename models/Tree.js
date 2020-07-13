class Tree {
  constructor(root) {
    this.root = root;
  }

  *DFS(stack) {
    const visited = [];
    stack.push(this.root);

    yield { elements: stack.elements, visited };

    while (!stack.isEmpty()) {
      const current = stack.pop();
      visited.push(current);
      yield { elements: stack.elements, visited };
      if (current.children.length > 0) {
        current.children.forEach(child => stack.push(child));
        yield { elements: stack.elements, visited };
      }
    }
  }
}

export default Tree;
