import styled from 'styled-components';

export const TodoListSectionWrapper = styled.section`
  width: 75vw;
  min-height: 60vh;
  margin-top: var(--padding-size-m);
  padding: var(--padding-size-s);
  border: 1px solid black;
  border-radius: var(--padding-size-s);
  & li:nth-child(even) > label {
    background-color: var(--color-gray-light);
  }
  & li:not(label) > label:hover {
    transition: all 0.3s;
    background-color: var(--color-primary-light);
  }
`;