import React, {useState} from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../../context/Modal"
import './BuyShares.css'

import { makeProperCents } from "../../../utils/properPrice";
import BuySharesForm from "./BuySharesForm";

function BuySharesModalButton({order, isYes}) {
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector((state) => state.session.user);

    // console.log(market_id)

    return (
        <>
            <div className={isYes ? "buy-shares-modal-button" : "buy-shares-modal-button make-it-no"} onClick={()=> setShowModal(true)}>
                <div className="buy-shares-data">
                    <div className="buy-shares-data-left">
                        {makeProperCents(order.price)}¢
                    </div>
                    <div className="buy-shares-data-right">
                        {order.quantity-order.quantity_filled}
                        {sessionUser.id === order.user_id ?
                                <div className="buy-shares-but-it-belongs-to-you"> (Your Order) </div>
                            :
                                ""
                        }
                    </div>

                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BuySharesForm setShowModal={setShowModal} order={order} />
                </Modal>
            )}
        </>
    )

}

export default BuySharesModalButton
