import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import './Signup.css'
import SignupForm from "../../auth/SignUpForm";
function SignupFormModalButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="signup-button" onClick={()=> setShowModal(true)}>
                Sign Up
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    )

}

export default SignupFormModalButton
