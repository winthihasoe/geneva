export function typedNameMatches(expected, typed) {
    const expectedName = String(expected ?? "").trim();
    const typedName = String(typed ?? "").trim();

    return expectedName !== "" && expectedName === typedName;
}
