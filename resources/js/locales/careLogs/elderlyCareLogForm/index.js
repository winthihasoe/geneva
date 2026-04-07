import en from "./en";
import my from "./my";

export const ELDERLY_CARE_LOG_FORM_LOCALE_KEY = "elderlyCareLogFormLocale";

/** @param {'en'|'my'} locale */
export function getElderlyFormStrings(locale) {
    return locale === "my" ? my : en;
}

export function parseElderlyFormLocale(value) {
    return value === "my" ? "my" : "en";
}
