import { makeProperCents } from "./properPrice"


const findLowestOffer = (orders) => {
    const prices = orders.map(order => order["price"])
    console.log(prices)
    return makeProperCents(Math.min(...prices))
}

const properYesNo = (market) => {
    if (market.sellOrders.length === 0) return "No Sell Orders"

    const sellOrders = market.sellOrders

    const yesShares = sellOrders.filter(sellOrder => sellOrder.is_yes === true)
    const noShares = sellOrders.filter(sellOrder => sellOrder.is_yes === false)

    return (
        <>
            <div className='splash-yes'> Yes {findLowestOffer(yesShares)}¢</div>
            <div className='splash-no'> No {findLowestOffer(noShares)}¢</div>
        </>
    )
}


export const showPrices = (market) => {
    let yesno = properYesNo(market)

    if (yesno === "No Sell Orders") {
        yesno = (
            <div className="featured-none-at-all">No Bets Yet</div>
        )
    }

    if (market.is_open === false) {
        yesno = (
            <div className="featured-none-at-all-but-close">Resolved</div>
        )
    }

    return yesno

}
