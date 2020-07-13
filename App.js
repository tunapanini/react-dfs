/* @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import TreeBox from "./components/TreeBox";
import Node from "./models/Node";
import Tree from "./models/Tree";
import StackBox from "./components/StackBox";
import Stack from "./models/Stack";

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

const App = () => {
  const [elements, setElements] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [restart, setRestart] = React.useState(null);

  React.useEffect(() => {
    if (restart !== false) {
      const myStack = new Stack();
      const dfsGen = tree.DFS(myStack);
      const interval = setInterval(() => {
        const result = dfsGen.next();
        if (!result.done) {
          setSelected([...result.value.visited]);
          setElements([...result.value.elements]);
        } else {
          setRestart(false);
          dispose();
        }
      }, 2000);
      const dispose = () => {
        clearInterval(interval);
      };
      return () => dispose();
    }
  }, [restart, setRestart]);

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        margin: 16px;
      `}
    >
      <StackBox
        elements={elements.map(el => ({ id: el.id, value: el.value.value }))}
      />
      <TreeBox tree={tree} selected={selected.map(node => Number(node.id))} />
      {restart === false && (
        <button onClick={() => setRestart(true)}>Restart</button>
      )}
    </div>
  );
};

export default App;
