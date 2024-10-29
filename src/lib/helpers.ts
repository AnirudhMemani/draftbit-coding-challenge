export const trimLeadingZeros = (str: string) => {
    return str.replace(/^0+/, "") || "0";
};
