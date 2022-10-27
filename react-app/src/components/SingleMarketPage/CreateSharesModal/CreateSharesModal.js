import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './CreateShares.css'
import CreateSharesForm from "./CreateSharesForm";

function CreateSharesModalButton({market_id}) {
    const [showModal, setShowModal] = useState(false)
    // console.log(market_id)

    return (
        <>
            <div className="create-shares-modal-button" onClick={()=> setShowModal(true)}>
                <div className="create-a-market-text">
                    Create Shares
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateSharesForm setShowModal={setShowModal} market_id={market_id} />
                </Modal>
            )}
        </>
    )

}

export default CreateSharesModalButton
