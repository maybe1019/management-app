import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './constants/locales'; //eslint-disable-line

// when we have more languages in the future, we may want to use i18next-http-backend to
// store and fetch translations in public folder so as to not pollute our project files.
// Just need to use lazy loading to allow time for translations to be loaded

i18n.use(initReactI18next).init({
  resources, // pass all language translations as json object
  debug: process.env.REACT_APP_DEPLOYED_ENV !== 'prod',
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
