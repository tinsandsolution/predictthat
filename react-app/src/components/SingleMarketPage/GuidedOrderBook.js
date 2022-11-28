import './OrderBook.css'
import { useSelector } from "react-redux";


import SingleListedOrderModalButton from './ListedOrdersModal/SingleOrderListingModal'

const GuidedOrderBook = ({market, forecast}) => {
    const sessionUser = useSelector((state) => state.session.user);

    let ordersToPurchase = market.sellOrders.filter(order=> {
        if (order.is_yes) return order.price * 100 < forecast
        if (!order.is_yes) return order.price * 100 < 100 - forecast
    }).filter(order => order.user_id !== sessionUser.id)
    ordersToPurchase.sort((a,b) => a.price - b.price)


    let ordersToCancel = market.sellOrders.filter(order=> {
        if (order.is_yes) return order.price * 100 < forecast
        if (!order.is_yes) return order.price * 100 < 100 - forecast
    }).filter(order => order.user_id === sessionUser.id)
    ordersToCancel.sort((a,b) => a.price - b.price)

    let yesOrders = market.sellOrders.filter(order=> order.is_yes === true )
    yesOrders.sort((a,b) => a.price - b.price)
    let noOrders = market.sellOrders.filter(order=> order.is_yes === false )
    noOrders.sort((a,b) => a.price - b.price)

    return (
        <>

        {
        ordersToPurchase.length !== 0
            ?
                <>
                    <div className='guided-title'>Purchase these shares:</div>
                    <div className="order-book">
                        {/* in here, you want to view all the sell offers for "yes" */}
                        <div className="buy-yes">
                            <div className="buy-yes-title">Buy Yes - # Available</div>
                            {ordersToPurchase.filter(order => order.is_yes === true).map(order => {
                                return (
                                    <SingleListedOrderModalButton order={order} isYes={true} orders={yesOrders} market={market}  />
                                )
                            })}
                        </div>
                        {/* in here, you want to view all the sell offers for "no" */}
                        <div className="buy-no">
                            <div className="buy-no-title">Buy No - # Available</div>
                            {ordersToPurchase.filter(order => order.is_yes === false).map(order => {
                                return (
                                    <SingleListedOrderModalButton order={order} isYes={false} orders={noOrders} market={market}/>
                                )
                            })}
                        </div>
                    </div>
                </>
            :
                ""
        }

        {
        ordersToCancel.length !== 0
            ?
                <>
                    <div className='guided-title'>Cancel these orders:</div>
                    <div className="order-book">
                        {/* in here, you want to view all the sell offers for "yes" */}
                        <div className="buy-yes">
                            <div className="buy-yes-title">Your Open "Yes" Orders - # Available</div>
                            {ordersToCancel.filter(order => order.is_yes === true).map(order => {
                                return (
                                    <SingleListedOrderModalButton order={order} isYes={true} orders={yesOrders} market={market}  />
                                )
                            })}
                        </div>
                        {/* in here, you want to view all the sell offers for "no" */}
                        <div className="buy-no">
                            <div className="buy-no-title">Your Open "No" Orders - # Available</div>
                            {ordersToCancel.filter(order => order.is_yes === false).map(order => {
                                return (
                                    <SingleListedOrderModalButton order={order} isYes={false} orders={noOrders} market={market}/>
                                )
                            })}
                        </div>
                    </div>
                </>
            :
                ""
        }

        <div className='guided-title'>Place these orders:</div>

        </>
    )
}

export default GuidedOrderBook
