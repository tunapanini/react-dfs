/* @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import TreeBox from "./components/TreeBox";
import StackBox from "./components/StackBox";
import QueueBox from "./components/QueueBox";
import Node from "./models/Node";
import Tree from "./models/Tree";
import Stack from "./models/Stack";
import Queue from "./models/Queue";

const root = new Node("A");
const nodeB = root.add("B");
nodeB.add("D");
nodeB.add("E");
const nodeC = root.add("C");
nodeC.add("F");
const nodeG = nodeC.add("G");
nodeG.add("I");
const nodeJ = nodeG.add("J");
nodeJ.add("K");
nodeC.add("H");

const tree = new Tree(root);

const TRAVERSE_MODE = {
  DFS: 0,
  BFS: 1
};
const App = () => {
  const [elements, setElements] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [traverseMode, setTraverseMode] = React.useState(null);

  React.useEffect(() => {
    if (traverseMode !== null) {
      let unvisited;
      if (traverseMode === TRAVERSE_MODE.BFS) {
        unvisited = new Queue();
      } else {
        unvisited = new Stack();
      }
      const traverseGen = tree.traverse(unvisited);
      const interval = setInterval(() => {
        const result = traverseGen.next();
        if (!result.done) {
          console.log(result);
          setSelected([...result.value.visited]);
          setElements([...result.value.elements]);
        } else {
          setTraverseMode(null);
          dispose();
        }
      }, 2000);
      const dispose = () => {
        clearInterval(interval);
      };
      return () => dispose();
    }
  }, [traverseMode, setTraverseMode]);

  return (
    <div
      css={css`
        display: flex;
        margin: 16px;
        flex-direction: column;
      `}
    >
      <div>
        <button onClick={() => setTraverseMode(TRAVERSE_MODE.DFS)}>DFS</button>
        <button onClick={() => setTraverseMode(TRAVERSE_MODE.BFS)}>BFS</button>
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        {traverseMode === TRAVERSE_MODE.DFS && (
          <StackBox
            elements={elements.map(el => ({
              id: el.id,
              value: el.value.value
            }))}
          />
        )}
        {traverseMode === TRAVERSE_MODE.BFS && (
          <QueueBox
            elements={elements.map(el => ({
              id: el.id,
              value: el.value.value
            }))}
            rotate
          />
        )}
        <TreeBox tree={tree} selected={selected.map(node => Number(node.id))} />
      </div>
      {traverseMode !== null && `traverse ${TRAVERSE_MODE.DFS ? "DFS" : "BFS"}`}
    </div>
  );
};

export default App;
