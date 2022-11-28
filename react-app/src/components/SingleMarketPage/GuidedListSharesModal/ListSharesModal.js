import React, {useState} from "react";
import { Modal } from "../../../context/Modal"
import { useSelector } from "react-redux";

import './ListShares.css'
import ListSharesForm from "./ListSharesForm";

function ListShares({market, forecast}) {
    const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [isYes, setIsYes] = useState(false)
    const [availableShares, setAvailableShares] = useState(false)


    let position = market.positions.filter(position => position.user_id === sessionUser.id)[0]
    if (!position) return <></>

    return (
        <>
            <div className="single-market-list-shares">
                {
                    forecast < 100
                        ?
                            <div className="sell-yes-section sell-section"
                                onClick={()=> {
                                    setShowModal(true)
                                    setIsYes(true)
                                    setAvailableShares(position.yes_shares)
                                }}
                                >
                                    Sell Your "Yes" Shares For {forecast + 1}¢ Or More - {position.yes_shares} Available
                            </div>
                        :
                            <div
                                className="sell-yes-section sell-section"
                                id = "guided-sell-section-na"
                                >
                                    N/A
                            </div>
                }

                {
                    forecast > 0
                        ?
                            <div className="sell-no-section sell-section"
                                onClick={()=> {
                                    setShowModal(true)
                                    setIsYes(false)
                                    setAvailableShares(position.no_shares)
                                }}
                                >
                                    Sell Your "No" Shares For {100 - forecast + 1}¢ Or More - {position.no_shares} Available
                            </div>
                        :
                            <div
                                className="sell-no-section sell-section"
                                id = "guided-sell-section-na"
                                >
                                    N/A
                            </div>
                }

            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ListSharesForm setShowModal={setShowModal} isYes={isYes} availableShares={availableShares} market={market} forecast={forecast} />
                </Modal>
            )}
        </>
    )

}

export default ListShares
