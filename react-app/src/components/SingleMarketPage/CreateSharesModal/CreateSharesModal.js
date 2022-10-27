import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './CreateShares.css'
import CreateSharesForm from "./CreateSharesForm";

function CreateSharesModalButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="create-shares-modal-button" onClick={()=> setShowModal(true)}>
                <div className="create-a-market-text">
                    Create Shares
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateSharesForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )

}

export default CreateSharesModalButton
