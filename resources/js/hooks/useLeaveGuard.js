import { useEffect, useRef } from "react";

let holders = 0;
let allowNextLeave = false;
let dialogOpen = false;
let pendingAction = null;
let onNavigate = null;
let onBeforeUnload = null;
const discardListeners = new Set();
const dialogListeners = new Set();

function emitDialog() {
    dialogListeners.forEach((listener) => listener(dialogOpen));
}

function isBackOrReload(event) {
    return event.navigationType === "traverse" || event.navigationType === "reload";
}

export function requestLeave(action) {
    if (holders === 0) {
        action();
        return;
    }

    pendingAction = action;
    if (!dialogOpen) {
        dialogOpen = true;
        emitDialog();
    }
}

export function stayOnPage() {
    dialogOpen = false;
    pendingAction = null;
    emitDialog();
}

export function discardAndLeave() {
    const action = pendingAction;
    dialogOpen = false;
    pendingAction = null;
    emitDialog();

    if (!action) {
        return;
    }

    allowNextLeave = true;
    discardListeners.forEach((listener) => listener());
    action();
}

export function subscribeLeaveDialog(listener) {
    dialogListeners.add(listener);
    listener(dialogOpen);

    return () => dialogListeners.delete(listener);
}

function continueBackOrReload(navigationType) {
    allowNextLeave = true;

    if (navigationType === "reload") {
        window.location.reload();
        return;
    }

    window.history.back();
}

function blockNavigation(event) {
    if (allowNextLeave) {
        allowNextLeave = false;
        return;
    }

    if (!isBackOrReload(event) || !event.cancelable) {
        return;
    }

    event.preventDefault();
    requestLeave(() => continueBackOrReload(event.navigationType));
}

function blockReload(event) {
    if (allowNextLeave) {
        allowNextLeave = false;
        return;
    }

    event.preventDefault();
    event.returnValue = "";
}

export function isLeaveBlocked() {
    return holders > 0;
}

function holdLeaveGuard(onDiscard) {
    discardListeners.add(onDiscard);

    if (holders === 0) {
        if (window.navigation) {
            onNavigate = blockNavigation;
            window.navigation.addEventListener("navigate", onNavigate);
        } else {
            onBeforeUnload = blockReload;
            window.addEventListener("beforeunload", onBeforeUnload);
        }
    }

    holders += 1;

    return () => {
        discardListeners.delete(onDiscard);
        holders -= 1;

        if (holders > 0) {
            return;
        }

        if (onNavigate && window.navigation) {
            window.navigation.removeEventListener("navigate", onNavigate);
            onNavigate = null;
        }

        if (onBeforeUnload) {
            window.removeEventListener("beforeunload", onBeforeUnload);
            onBeforeUnload = null;
        }

        stayOnPage();
    };
}

export default function useLeaveGuard(active, onDiscard) {
    const onDiscardRef = useRef(onDiscard);
    onDiscardRef.current = onDiscard;

    useEffect(() => {
        if (!active) {
            return undefined;
        }

        return holdLeaveGuard(() => onDiscardRef.current());
    }, [active]);
}
