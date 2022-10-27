import './OrderBook.css'

const OrderBook = ({market}) => {
    console.log(market)

    return (
        <div className="order-book">
            {/* in here, you want to view all the sell offers for "yes" */}
            <div className="buy-yes">
                Buy Yes Asks
                {/* {market.buyOrders.map(buyOrder)} */}
            </div>
            {/* in here, you want to view all the sell offers for "no" */}
            <div className="buy-no">
                Buy No Asks
            </div>
            {/* {market.is_in_play ? "hayd" : <div className="no-open-orders-yet">No Open Orders Yet</div>} */}
        </div>
    )
}

export default OrderBook
