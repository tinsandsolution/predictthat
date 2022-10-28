import { makeProperCents } from "./properPrice"


const findLowestOffer = (orders) => {
    const prices = orders.map(order => order["price"])
    console.log(prices)
    return makeProperCents(Math.min(...prices))
}


export const properYesNo = (market) => {
    if (market.sellOrders.length === 0) return <></>

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
