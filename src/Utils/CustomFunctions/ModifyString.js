export const ModifyString = (stringVal, stringCase, splitSign) => {
    let splitedString = splitSign ? stringVal?.split(splitSign ?? '_') : [];
    let modifiedString = "";

    splitedString.length > 0 && splitedString?.forEach((elem) => {
        modifiedString += elem?.charAt(0).toUpperCase() + elem?.slice(1) + " ";
    });
    if (stringCase == 'upper') {
        return modifiedString ? modifiedString?.toUpperCase() : stringCase?.toUpperCase()
    } else if (stringCase == 'lower') {
        return modifiedString ? modifiedString?.toLowerCase() : stringCase?.toLowerCase()
    } else return modifiedString?.trim();
};
