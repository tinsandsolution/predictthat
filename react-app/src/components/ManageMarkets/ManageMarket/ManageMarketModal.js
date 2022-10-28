import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './ManageMarket.css'
import ManageMarketForm from "./ManageMarketForm";

function ManageMarketModalButton({market}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="resolve-market-button" onClick={()=> setShowModal(true)}>
                    Modify Market
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ManageMarketForm market={market} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )

}

export default ManageMarketModalButton
