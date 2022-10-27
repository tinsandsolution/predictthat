import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './CreateMarket.css'
import CreateMarketForm from "./CreateMarketForm";

function CreateMarketModalButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="create-a-market fa-2xl" onClick={()=> setShowModal(true)}>
                <i className="fa-solid fa-money-bill-trend-up"></i>
                <div className="create-a-market-text">
                    Create A New Market
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateMarketForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )

}

export default CreateMarketModalButton
