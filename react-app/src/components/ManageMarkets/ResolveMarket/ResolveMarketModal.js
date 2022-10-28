import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './ResolveMarket.css'
import ResolveMarketForm from "./ResolveMarketForm";

function ResolveMarketModalButton({market}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="resolve-market-button" onClick={()=> setShowModal(true)}>
                    Resolve Market
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ResolveMarketForm market={market} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )

}

export default ResolveMarketModalButton
