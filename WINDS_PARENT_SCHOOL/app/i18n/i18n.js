import I18n from 'react-native-i18n';
import vi from './locales/vi';
import en from './locales/en';

I18n.fallbacks = false;

I18n.translations = {
  vi,
  en
};
// I18n.defaultLocale = "vi";
I18n.locale = "vi";

export default I18n;