import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './Login.css'
import LoginForm from "../../auth/LoginForm";
function LoginFormModalButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="login-button" onClick={()=> setShowModal(true)}>
                Log In
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )

}

export default LoginFormModalButton
