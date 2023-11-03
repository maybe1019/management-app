import Analytics from 'analytics';
import segmentPlugin from '@analytics/segment';

import { SEGMENT_KEY } from '../constants/index';

const analytics = Analytics({
  app: 'Secberus',
  plugins: [
    segmentPlugin({
      writeKey: SEGMENT_KEY,
    }),
  ],
});

export default analytics;
