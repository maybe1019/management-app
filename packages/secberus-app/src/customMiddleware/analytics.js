import analytics from '../integrations/analytics';
import analyticsMap from '../utils/analytics';

export default () => next => reduxAction => {
  if (typeof analyticsMap[reduxAction.type] !== 'undefined') {
    const { currentRoute: location, type } = reduxAction;
    const { method, event } = analyticsMap[type];
    analytics[method]();
  }

  return next(reduxAction);
};
