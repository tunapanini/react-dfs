/* @jsx jsx */
import { css, jsx } from "@emotion/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const StackBox = ({ elements }) => {
  const transitionTimeout = 600;
  return (
    <TransitionGroup
      css={css`
        label: StackBox__wrapper;
        display: inline-flex;
        flex-direction: column-reverse;
        width: 32px;
        border: solid blue;
        border-width: 0px 2px 2px 2px;
      `}
    >
      {elements.map(el => (
        <CSSTransition
          key={el.id}
          timeout={transitionTimeout}
          classNames="rotate"
          css={css`
            label: StackBox__item;
            display: flex;
            width: 32px;
            height: 32px;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            &.rotate-enter {
              transform: rotate(420deg);
              opacity: 0;
            }
            &.rotate-enter-active {
              transform: rotate(0);
              opacity: 1;
              transition: opacity ${transitionTimeout}ms,
                transform ${transitionTimeout}ms;
            }
            &.rotate-exit {
              transform: rotate(0);
              opacity: 1;
            }
            &.rotate-exit-active {
              transform: rotate(420deg);
              opacity: 0;
              transition: opacity ${transitionTimeout}ms,
                transform ${transitionTimeout}ms;
            }
          `}
        >
          <span>{el.value}</span>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default StackBox;
