import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './HelpModal.css'
import HelpForm from "./HelpModalForm";
// import CreateSharesForm from "./CreateSharesForm";

function HelpModalButton({market_id}) {
    const [showModal, setShowModal] = useState(false)
    // console.log(market_id)

    return (
        <>
            <div className="help-modal-button-container" onClick={()=> setShowModal(true)}>
                <i class="fa-regular fa-circle-question fa-xs"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    hay
                    <HelpForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )

}

export default HelpModalButton
