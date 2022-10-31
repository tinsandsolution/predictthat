import React, {useState} from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../../context/Modal"
import './SingleOrderListing.css'

import { makeProperCents } from "../../../utils/properPrice";
import BuySharesForm from "./BuySharesForm";
import ManageSharesForm from "./ManageSharesForm";

function SingleListedOrderModalButton({order, isYes, orders}) {
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector((state) => state.session.user);
    const belongsToUser = sessionUser.id === order.user_id

    // console.log(market_id)
    const ordersLength = orders.length
    const orderIndex = orders.indexOf(order) + 1
    const isLast = ordersLength === orderIndex


    let buttonClass = "buy-shares-modal-button"
    if (!isYes) buttonClass += " make-it-no"
    if (isLast) buttonClass += " last-share-listing-no-border"

    return (
        <>
            <div className={buttonClass} onClick={()=> setShowModal(true)}>
                <div className="buy-shares-data">
                    <div className="buy-shares-data-left">
                        {makeProperCents(order.price)}¢
                    </div>
                    <div className="buy-shares-data-right">
                        {order.quantity-order.quantity_filled}
                        {belongsToUser ?
                                <div className="buy-shares-but-it-belongs-to-you"> (Your Order) </div>
                            :
                                ""
                        }
                    </div>

                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {
                        belongsToUser
                            ?
                                <ManageSharesForm setShowModal={setShowModal} order={order} />
                            :
                                <BuySharesForm setShowModal={setShowModal} order={order} />
                    }
                </Modal>
            )}
        </>
    )

}

export default SingleListedOrderModalButton
