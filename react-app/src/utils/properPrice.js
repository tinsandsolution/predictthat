const firstPass = (price) => {
    try {
        let s = String(price).split(".")
        // return s
        if (s[1].length === 1) return s[1] + "0"
        else return s[1]
    }
    catch {
        return "--"
    }
}

export const makeProperCents = (price) => {
    let newPrice = firstPass(price)
    if (newPrice[0] === "0") return newPrice[1]
    return newPrice
}
