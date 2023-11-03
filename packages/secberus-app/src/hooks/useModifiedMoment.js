import React from 'react';

import moment from '../utils/moment';

const useModifiedMoment = locale => {
  React.useEffect(() => {
    moment.locale(locale);
    return () => moment.locale('en');
  }, [locale]);
  return moment;
};

export default useModifiedMoment;
