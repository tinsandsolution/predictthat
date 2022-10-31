import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import { useSelector } from "react-redux";

import './ListShares.css'
import ListSharesForm from "./ListSharesForm";

function ListShares({market}) {
    const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [isYes, setIsYes] = useState(false)
    const [availableShares, setAvailableShares] = useState(false)


    let position = market.positions.filter(position => position.user_id === sessionUser.id)[0]

    return (
        <>
            <div className="single-market-list-shares">
                <div className="sell-yes-section sell-section"
                    onClick={()=> {
                        setShowModal(true)
                        setIsYes(true)
                        setAvailableShares(position.yes_shares)
                    }}
                    >
                        List Your "Yes" Shares - {position.yes_shares} Available
                </div>
                <div className="sell-no-section sell-section"
                    onClick={()=> {
                        setShowModal(true)
                        setIsYes(false)
                        setAvailableShares(position.no_shares)
                    }}
                    >
                        List Your "No" Shares - {position.no_shares} Available
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    hay
                    <ListSharesForm setShowModal={setShowModal} isYes={isYes} availableShares={availableShares} />
                </Modal>
            )}
        </>
    )

}

export default ListShares
