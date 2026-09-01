const BLOCKED_KEYS = new Set(["-", "e", "E", "+"]);

export const hideNumberSpinnerSx = {
    "& input[type=number]": {
        MozAppearance: "textfield",
        appearance: "textfield",
        "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
    },
};

export function nonNegativeNumberInputProps(extra = {}) {
    const { onKeyDown, onPaste, onWheel, className, min = 0, ...rest } = extra;

    return {
        min,
        className: ["no-number-spin", className].filter(Boolean).join(" "),
        ...rest,
        onKeyDown: (event) => {
            if (BLOCKED_KEYS.has(event.key)) {
                event.preventDefault();
            }
            onKeyDown?.(event);
        },
        onPaste: (event) => {
            const text = event.clipboardData?.getData("text") ?? "";
            if (text !== "" && Number(text) < 0) {
                event.preventDefault();
            }
            onPaste?.(event);
        },
        onWheel: (event) => {
            event.currentTarget.blur();
            onWheel?.(event);
        },
    };
}

export function nonNegativeNumberFieldProps(inputProps = {}) {
    return {
        type: "number",
        sx: hideNumberSpinnerSx,
        inputProps: nonNegativeNumberInputProps(inputProps),
    };
}

export function handleNonNegativeNumberChange(onValue) {
    return (event) => {
        const value = event.target.value;
        if (value === "" || Number(value) >= 0) {
            onValue(value);
        }
    };
}
