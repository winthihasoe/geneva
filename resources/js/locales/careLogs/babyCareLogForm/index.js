import en from "./en";
import my from "./my";

export const BABY_CARE_LOG_FORM_LOCALE_KEY = "babyCareLogFormLocale";

/** @param {'en'|'my'} locale */
export function getBabyFormStrings(locale) {
    return locale === "my" ? my : en;
}

export function parseBabyFormLocale(value) {
    return value === "my" ? "my" : "en";
}
