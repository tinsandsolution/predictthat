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

                // const i = markets.findIndex((ele) => ele === market)

                let i = 1

                let yesno = (
                    <>
                        <div className='splash-yes'> Yes {market.yes_value}¢</div>
                        <div className='splash-no'> No {market.no_value}¢</div>
                    </>
                )

                if (market.yes_value === 0 && market.no_value === 0) {
                    yesno = (
                        <div className="rest-none-at-all">No Bets Yet</div>
                    )
                }

                return (
                    <div className='manage-card-wrapper'>
                            <div className='manage-card-title'> {market["title"]} </div>
                            <div className='manage-card-resolves'> {market.expected_resolution_time === null ? "Ongoing" : market.expected_resolution_time} </div>
                            <div className='manage-yes-no'>
                                {yesno}
                            </div>
                        {/* <div className={i % 2 === 0 ? "rest-card-right" : "rest-card-right nb"}> */}
                            {/* <img className='rest-card-image' alt="" src={market["image_url"]}></img> */}
                        {/* </div> */}
                    </div>
                )

            })}
            </>
        )
    }


    return (
        <div className="manage-markets-container">
            {makeLongCards(markets)}
        </div>
    )
}

export default ManageMarkets
