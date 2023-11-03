import styled from 'styled-components';

export const Snackwich = styled.div`
  margin-bottom: 24px;
  margin-left: 24px;
`;

export const Snackbox = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  bottom: 0;
  z-index: 2000;
  & .notification-enter {
    opacity: 0;
    transform: translateX(-50vw);
  }
  & .notification-enter-done {
    opacity: 1;
    transform: translateX(0);
    transition: all 200ms ease-in-out;
  }
  & .notification-exit {
    opacity: 1;
    transform: translateX(0);
  }
  & .notification-exit-active {
    opacity: 0;
    transform: translateX(-50vw);
    transition: all 200ms ease-in-out;
  }
`;
