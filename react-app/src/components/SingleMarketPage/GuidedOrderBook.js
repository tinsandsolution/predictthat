import './OrderBook.css'
import { useSelector } from "react-redux";


import SingleListedOrderModalButton from './ListedOrdersModal/SingleOrderListingModal'

const GuidedOrderBook = ({market, forecast}) => {
    const sessionUser = useSelector((state) => state.session.user);

    let yesOrders = market.sellOrders.filter(order=> {
        if (forecast === null) return order.is_yes === true
        else {
            return order.is_yes === true && order.price * 100 < forecast
        }

    })
    yesOrders.sort((a,b) => a.price - b.price)

    let noOrders = market.sellOrders.filter(order=> {
        if (forecast === null) return order.is_yes === false
        else {
            return order.is_yes === false && order.price * 100 < forecast
        }

    })
    noOrders.sort((a,b) => a.price - b.price)

    let yesOrdersUser = market.sellOrders.filter(order=> {
        if (forecast === null) return order.is_yes === true
        else {
            return order.is_yes === true && order.price * 100 < forecast
        }

    })
    yesOrdersUser.sort((a,b) => a.price - b.price)

    let noOrdersUser = market.sellOrders.filter(order=> {
        if (forecast === null) return order.is_yes === false
        else {
            return order.is_yes === false && order.price * 100 < forecast
        }

    })
    noOrdersUser.sort((a,b) => a.price - b.price)


    return (
        <>

        You should purchase these shares:
        <div className="order-book">
            {/* in here, you want to view all the sell offers for "yes" */}
            <div className="buy-yes">
                <div className="buy-yes-title">Buy Yes - # Available</div>
                {yesOrders.filter(order => order.user_id !== sessionUser.id).map(order => {
                    return (
                        <SingleListedOrderModalButton order={order} isYes={true} orders={yesOrders} market={market}  />
                    )
                })}
            </div>
            {/* in here, you want to view all the sell offers for "no" */}
            <div className="buy-no">
                <div className="buy-no-title">Buy No - # Available</div>
                {noOrders.filter(order => order.user_id !== sessionUser.id).map(order => {
                    return (
                        <SingleListedOrderModalButton order={order} isYes={false} orders={noOrders} market={market}/>
                    )
                })}
            </div>
        </div>
        You should cancel these orders:
        <div className="order-book">
            {/* in here, you want to view all the sell offers for "yes" */}
            <div className="buy-yes">
                <div className="buy-yes-title">Buy Yes - # Available</div>
                {yesOrdersUser.filter(order => order.user_id === sessionUser.id).map(order => {
                    return (
                        <SingleListedOrderModalButton order={order} isYes={true} orders={yesOrders} market={market}  />
                    )
                })}
            </div>
            {/* in here, you want to view all the sell offers for "no" */}
            <div className="buy-no">
                <div className="buy-no-title">Buy No - # Available</div>
                {noOrdersUser.filter(order => order.user_id === sessionUser.id).map(order => {
                    return (
                        <SingleListedOrderModalButton order={order} isYes={false} orders={noOrders} market={market}/>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default GuidedOrderBook
