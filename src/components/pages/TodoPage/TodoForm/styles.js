import styled from 'styled-components';

export const TodoFromSectionWrapper = styled.section`
  & form {
    display: flex;
    width: 75vw;
    max-width: 1000px;
    gap: 10px;
    & input, button {
      line-height: var(--width-size-30);
      font-size: var(--font-size-m);
      border-radius: var(--padding-size-s);
    }
    & input {
      width: 100%;
      padding: 0 var(--padding-size-s);
      border: 1px solid black;
    }
    & button {
      width: calc(var(--width-size-30) * 2);
      border: 1px solid transparent;
      background-color: var(--color-primary);
      box-shadow: 1px 1px 1px 1px var(--color-gray-light);
      transition: all 0.3s;
      :hover {
        background-color: var(--color-primary-light);
      }
    }
  }
`;