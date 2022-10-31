import './OrderBook.css'

import BuySharesModalButton from './BuySharesModal/BuySharesModal'

const OrderBook = ({market}) => {
    let yesOrders = market.sellOrders.filter(order=> order.is_yes === true )
    yesOrders.sort((a,b) => a.price - b.price)
    let noOrders = market.sellOrders.filter(order=> order.is_yes === false )
    noOrders.sort((a,b) => a.price - b.price)


    return (
        <>
        <div className="order-book">
            {/* in here, you want to view all the sell offers for "yes" */}
            <div className="buy-yes">
                <div className="buy-yes-title">Buy Yes - # Available</div>
                {yesOrders.map(order => {
                    return (
                        <BuySharesModalButton order={order} isYes={true} />
                    )
                })}
            </div>
            {/* in here, you want to view all the sell offers for "no" */}
            <div className="buy-no">
                <div className="buy-no-title">Buy No - # Available</div>
                {noOrders.map(order => {
                    return (
                        <BuySharesModalButton order={order} isYes={false} />
                    )
                })}
            </div>
        </div>
        {market.sellOrders.length !== 0 ? "" : <div className="no-open-orders-yet">No Open Orders Yet</div>}
        </>
    )
}

export default OrderBook
