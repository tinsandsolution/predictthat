import './OrderBook.css'

import BuySharesModalButton from './BuySharesModal/BuySharesModal'

const OrderBook = ({market}) => {
    const yesOrders = market.sellOrders.filter(order=> order.is_yes === true )
    const noOrders = market.sellOrders.filter(order=> order.is_yes === false )


    return (
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
            {/* {market.is_in_play ? "hayd" : <div className="no-open-orders-yet">No Open Orders Yet</div>} */}
        </div>
    )
}

export default OrderBook
