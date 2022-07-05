export function alphabeticalAndNumericRestrictionsAllStr(): RegExp {
    return new RegExp("^[A-Za-z0-9]*$");
}

export function numericRestrictions(): RegExp {
    return new RegExp("^[0-9]*$");
}