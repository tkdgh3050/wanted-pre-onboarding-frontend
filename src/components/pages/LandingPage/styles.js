import styled from 'styled-components';

export const MainWrapper = styled.main`
  display: flex;
  align-items: center;
  min-height: var(--default-main-height);
  & img {
    width: 40vw;
    height: fit-content;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    & img {
      width: 100vw;
      height: fit-content;
    }
  }
`;

export const IntroSectionWrapper = styled.section`
  width: 60vw;
  font-size: 3vw;
  
  & h2 {
    margin-top: 0px;
  }

  & p {
    word-break: keep-all;
  }

  & button {
    font-weight: bold;
    font-size: 2vw;
    border-radius: var(--padding-size-s);
    padding: 6px 0;
    width: 20vw;
    border: 1px solid transparent;
    box-shadow: 1px 1px 1px 1px var(--color-gray-light);
    background-color: var(--color-primary);
    transition: all 0.3s;
    :hover {
      background-color: var(--color-primary-light);
    }
  }
  @media screen and (max-width: 768px) {
    width: 80vw;
    font-size: max(20px, 4vw);
    padding-bottom: var(--padding-size-l);
    & button {
      font-size: max(13px, 3vw);
      width: 23vw;
      min-width: 90px;
    }
  }
`;