/* @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import React from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

function QueueBox({ elements, rotate = false }) {
  return (
    <div
      css={css`
        label: QueueBox;
        background-color: #079494;
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 4px;
        color: #fff;
        ${rotate ? `flex-direction: column;` : null}
      `}
    >
      <span>Front</span>
      <TransitionGroup
        css={css`
          flex: 1;
          height: 32px;
          width: 32px;
          display: inline-flex;
          overflow-y: hidden;
          overflow-x: auto;
          border: 1px solid #bbb;
          ${rotate ? `flex-direction: column;` : null}
        `}
      >
        {elements.map(el => (
          <CSSTransition
            classNames="fade"
            timeout={400}
            key={el.id}
            css={css`
              label: QueueBox__item;
              flex: 1;
              max-width: 32px;
              max-height: 32px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              &.fade-enter {
                opacity: 0;
              }
              &.fade-enter-active {
                opacity: 1;
                transition: opacity 400ms;
              }
              &.fade-exit {
                opacity: 1;
              }
              &.fade-exit-active {
                opacity: 0;
                transition: opacity 400ms;
              }
            `}
          >
            <span>{el.value}</span>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <span>Rear</span>
    </div>
  );
}

export default QueueBox;
