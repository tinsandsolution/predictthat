import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';

import { getAllMarkets } from '../../store/market';

import './ManageMarkets.css'


const ManageMarkets = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    let markets = useSelector((state) => state.markets)
    markets = markets.filter((market) => market.manager_id === sessionUser.id)

    useEffect(() => {
      (async() => {
        await dispatch(getAllMarkets());
        setLoaded(true);
      })();
    }, [dispatch]);

    const makeLongCards = (markets) => {
        return (
            <>
            {markets.map(market => {

                let manageOptions = (
                    <>
                    <div className="manage-market-button"></div>
                    </>
                )
                if (market.is_in_play) {

                }
                else {

                }

                let inPlay = (
                        <div className="manage-market-status">Trading has not yet begun. You can still edit the title, description, expected resolution time. You can also delete.</div>
                )
                if (market.is_in_play) {
                    inPlay = (
                        <div className="manage-market-status">Trading has already begun. You are only able to resolve this market by entering the outcome.</div>
                    )
                }

                return (
                    <div className='manage-card-wrapper'>
                            <div className='manage-card-title'> {market["title"]} </div>
                            <div className="manage-card-bottom">
                                <div className="manage-card-bottom-left">
                                   <div className='manage-card-resolves'> {market.expected_resolution_time === null ? "Ongoing" : market.expected_resolution_time} </div>
                                   <div className='manage-yes-no'>
                                     {inPlay}
                                    </div>
                                </div>
                                <div className="manage-card-bottom-right">
                                        <img className='manage-card-image' alt="" src={market["image_url"]}></img>
                                </div>
                            </div>
                    </div>
                )

            })}
            </>
        )
    }


    return (
        <div className="manage-markets-container">
            <div className="create-a-market fa-2xl">
                <i className="fa-solid fa-money-bill-trend-up">
                </i>
                <div className="create-a-market-text">
                    Create A New Market
                </div>
            </div>
            {makeLongCards(markets)}
        </div>
    )
}

export default ManageMarkets
