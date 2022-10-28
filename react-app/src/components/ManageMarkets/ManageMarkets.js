import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';

import { getAllMarkets } from '../../store/market';

import './ManageMarkets.css'
import CreateMarketModalButton from "./CreateMarket/CreateMarketModal";
import ResolveMarketModalButton from "./ResolveMarket/ResolveMarketModal";

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
                    <ResolveMarketModalButton market={market} />
                    </>
                )
                if (!market.is_in_play) {
                    manageOptions = (
                        <>
                        <div className="manage-market-button">Manage Market</div>
                        </>
                    )

                }

                let inPlay = (
                        <div className="manage-market-status">Trading has not yet begun. You can modify this market.</div>
                )
                if (market.is_in_play) {
                    inPlay = (
                        <div className="manage-market-status">Trading has already begun. You are only able to resolve this market.</div>
                    )
                }

                return (
                    <div className='manage-card-wrapper'>
                            <div className='manage-card-title'> {market["title"]} </div>
                            <div className="manage-card-bottom">
                                <div className="manage-card-bottom-left">
                                    <div className="mcblt">
                                        <div className='manage-card-resolves'> {market.expected_resolution_time === null ? "Ongoing" : market.expected_resolution_time} </div>
                                        {inPlay}
                                    </div>
                                    <div className="mcblb">
                                        {manageOptions}
                                    </div>
                                </div>
                                <div className="manage-card-bottom-right">
                                        <img className='manage-card-image'
                                             alt=""
                                             src={market["image_url"]}
                                             onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}
                                        ></img>
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
            <CreateMarketModalButton />
            {makeLongCards(markets)}
        </div>
    )
}

export default ManageMarkets
