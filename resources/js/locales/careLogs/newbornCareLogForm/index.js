import en from "./en";
import my from "./my";

export const NEWBORN_CARE_LOG_FORM_LOCALE_KEY = "newbornCareLogFormLocale";

/** @param {'en'|'my'} locale */
export function getNewbornFormStrings(locale) {
    return locale === "my" ? my : en;
}

export function parseNewbornFormLocale(value) {
    return value === "my" ? "my" : "en";
}
