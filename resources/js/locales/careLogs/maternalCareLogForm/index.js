import en from "./en";
import my from "./my";

export const MATERNAL_CARE_LOG_FORM_LOCALE_KEY = "maternalCareLogFormLocale";

/** @param {'en'|'my'} locale */
export function getMaternalFormStrings(locale) {
    return locale === "my" ? my : en;
}

export function parseMaternalFormLocale(value) {
    return value === "my" ? "my" : "en";
}
