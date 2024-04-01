import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';

import { en } from './en';
import { fr } from './fr';

export const defaultNS = 'common';
const ns = [...Object.keys(en)];

export const resources = {
  en,
  fr,
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      format: function (value, format) {
        if (value instanceof Date) return moment(value).format(format);
        return value;
      },
      escapeValue: false,
    },
    fallbackLng: process.env.REACT_APP_PUBLIC_LANGUAGE,
    lng: process.env.REACT_APP_PUBLIC_LANGUAGE,
    defaultNS,
    ns,
    resources,
  });

export type TLang = keyof typeof resources;

export const changeAppLanguage = (lang: TLang) => {
  i18n.changeLanguage(lang);
};

export default i18n;
