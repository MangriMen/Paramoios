import i18n from 'i18next';
import ru from 'locales/ru';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: ['en', 'ru'],
});
