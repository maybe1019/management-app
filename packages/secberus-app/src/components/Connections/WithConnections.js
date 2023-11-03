import PropTypes from 'prop-types';
import React from 'react';
import useIntercom from '@reclaim-ai/react-intercom-hook';
import { INTERCOM_APP_ID } from '../../constants/index';
import analytics from '../../integrations/analytics';
import { useTypedSelector } from '../../store/RootStateType';
import { selectEmail } from '@secberus/services';

const WithConnections = ({ children }) => {
  // These are coupled in the same file because Intercom can be handled through Segment and eventually we should make that transition.

  const intercom = useIntercom({
    app_id: INTERCOM_APP_ID,
  });
  const email = useTypedSelector(selectEmail);

  React.useEffect(() => {
    analytics.identify(email, {
      name: email,
      email,
    });
  }, [email]);

  React.useEffect(() => {
    intercom('shutdown');
    intercom('update', { name: email, email });
  }, [email, intercom]);

  return children;
};

WithConnections.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default WithConnections;
