import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import Backend from 'i18next-http-backend';
// import translation from './en/translation.json';
i18next
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(
    {
      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
        addPath: '/locales/{{lng}}/translation.json',
      },
      detection: {
        order: ['path', 'cookie', 'querystring'],
        caches: ['cookie'],
      },
      fallbackLng: {
        default: ['en'],
      },
      preload: ['en'],
      saveMissing: true,
      debug: true,
    },
    (err) => {
      if (err) {
        console.error(err);
        throw new Error(err);
      }
    }
  );
// .loadPath('./en/translation.json');
export default i18next;
