import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './BuyShares.css'

import { makeProperCents } from "../../../utils/properPrice";
import BuySharesForm from "./BuySharesForm";

function BuySharesModalButton({order, isYes}) {
    const [showModal, setShowModal] = useState(false)
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
                    </div>

                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    hay
                    <BuySharesForm setShowModal={setShowModal} order={order} />
                </Modal>
            )}
        </>
    )

}

export default BuySharesModalButton
