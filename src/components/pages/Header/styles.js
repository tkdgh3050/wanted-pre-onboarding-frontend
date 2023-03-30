import styled from 'styled-components';

export const LogoH1Wrapper = styled.h1`
  & a {
    color: var(--color-primary-dark);
    text-shadow: 2px 2px 2px var(--color-gray-light);
    transition: color .3s;
    :hover {
      color: var(--color-primary);
      }
  }
`;

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: var(--padding-size-s);
  border-bottom: 1px solid var(--color-gray-light);
`;

export const MenuNavWrapper = styled.nav`
  display: flex;
  & div {
    text-align: center;
    width: var(--width-size-100);
    font-size: var(--font-size-ml);
    text-shadow: 2px 2px 2px var(--color-gray-light);
    & a {
      color: var(--color-gray);
      transition: color .3s;
      :hover {
        color: var(--color-primary);
      }
    }
  }
`;