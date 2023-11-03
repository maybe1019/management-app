import React from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Snackbar } from '@secberus/components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store/RootStateType';
import {
  Notification,
  removeNotification,
} from '../../store/slices/notification';
import { Snackwich, Snackbox } from './WithNotifications.styled';

export const WithNotifications: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { entities, ids } = useTypedSelector(state => state.notification);

  const snacks = React.useMemo(() => {
    return ids.map((id, index) => {
      const notification = entities[id];
      const {
        type,
        message,
        value,
        duration = 5000,
        dismiss,
      } = notification as Notification;
      const distanceFromNew = ids.length - (index + 1);
      const opacity = 1 - distanceFromNew * 0.13;
      let msg = message || value;
      msg = msg!.length > 255 ? `${msg!.substr(0, 255).trimEnd()}...` : msg;
      return (
        <CSSTransition key={id} appear timeout={200} classNames="notification">
          <Snackwich>
            <Snackbar
              opacity={opacity}
              duration={duration}
              key={id}
              type={type}
              id={id}
              dismiss={!!dismiss}
              remove={() => dispatch(removeNotification(id))}
            >
              {msg}
            </Snackbar>
          </Snackwich>
        </CSSTransition>
      );
    });
  }, [ids, entities, dispatch]);

  return (
    <>
      {createPortal(
        <Snackbox>
          <TransitionGroup>{snacks}</TransitionGroup>
        </Snackbox>,
        document.body
      )}
      {children}
    </>
  );
};
