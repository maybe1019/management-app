import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentRoute } from '../../store/index';
import { history } from '../../store/storeWebConfig';

const RouteListener = ({ children }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setCurrentRoute({
        action: history.action,
        location: history.location,
      })
    );
    history.listen(location =>
      dispatch(
        setCurrentRoute({
          action: history.action,
          location,
        })
      )
    );
  });
  return children;
};

export default RouteListener;
