import moment from 'moment';

moment.defineLocale('en-modified', {
  parentLocale: 'en',
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'few seconds',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dhr',
    hh: '%dhr',
    d: '%dd',
    dd: '%dd',
    M: '%dmo',
    MM: '%dmo',
    y: '%dyr',
    yy: '%dyr',
  },
});

moment.locale('en');

export default moment;
