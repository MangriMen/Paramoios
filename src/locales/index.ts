import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./ru";

const resources = {
  ru,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: ["en", "ru"],
});
