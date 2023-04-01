import styled from 'styled-components'

export const TodoListLiWrapper = styled.li`
  display: flex;
  margin: var(--padding-size-s) 0;
  font-size: var(--font-size-m);
  min-height: var(--width-size-30);
  gap: var(--padding-size-s);
  & label {
    display: flex;
    align-items: center;
    gap: var(--padding-size-s);
    width: 100%;
    border-radius: var(--padding-size-s);
    & input.modifyInput {
      font-size: var(--font-size-m);
      width: 100%;
      min-height: var(--width-size-30);
    }
    & span {
      word-break: break-all;
      padding-right: 2px;
    }
    & span.completed {
      text-decoration-line: line-through;
    }
  }
  & div {
    display: flex;
    gap: 10px;
    & button {
      border-radius: var(--padding-size-s);
      width: calc(var(--width-size-30) * 2 - var(--padding-size-s));
      border: 1px solid transparent;
      box-shadow: 1px 1px 1px 1px var(--color-gray-light);
    }
    & button.delete {
      background-color: var(--color-secondary);
      transition: all 0.3s;
      :hover {
        background-color: var(--color-primary-light);
      }
    }
    & button.modify {
      background-color: var(--color-third);
      transition: all 0.3s;
      :hover {
        background-color: var(--color-primary-light);
      }
    }
  }
`;
