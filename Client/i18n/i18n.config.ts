import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, fr, es, it } from "./translations";

const resources = {
	en: {
		translation: en,
	},
	fr: {
		translation: fr,
	},
	es: {
		translation: es,
	},
	it: {
		translation: it,
	},
};

i18next.use(initReactI18next).init({
	debug: true,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	resources,
});

export default i18next;
