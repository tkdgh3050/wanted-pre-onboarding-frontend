import styled from 'styled-components';

export const SignupMainWrapper = styled.main`
  height: var(--default-main-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

export const FormDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & input, button {
    width: calc(var(--width-size-100) * 3);
    line-height: var(--width-size-30);
    margin-top: var(--padding-size-m);
    padding: 0 var(--padding-size-s);
    font-size: var(--font-size-m);
  }
  & button {
    border: 1px solid transparent;
    background-color: var(--color-primary);
    box-shadow: 1px 1px 1px 1px var(--color-gray-light);
    transition: all 0.3s;
    :hover {
      background-color: var(--color-primary-light);
    }
    :disabled {
      background-color: var(--color-gray-light);
    }
  }
`;

export const ErrorDivWrapper = styled.div`
  color: var(--color-red);
`;