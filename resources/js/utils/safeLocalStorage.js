export function getLocalStorage(key) {
    try {
        if (typeof window === "undefined") {
            return null;
        }
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

export function setLocalStorage(key, value) {
    try {
        if (typeof window === "undefined") {
            return false;
        }
        window.localStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
}

export function removeLocalStorage(key) {
    try {
        if (typeof window === "undefined") {
            return false;
        }
        window.localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
}
