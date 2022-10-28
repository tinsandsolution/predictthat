export const makeProperCents = (price) => {
    let s = String(price).split(".")
    // return s
    if (s[1].length === 1) return s[1] + "0"
    else return s[1]
}
