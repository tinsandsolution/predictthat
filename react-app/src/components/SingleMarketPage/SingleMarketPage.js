import { useSelector } from "react-redux";
import { useParams, useHistory} from 'react-router-dom';
import React, { useState } from "react";

import { ToggleSlider }  from "react-toggle-slider";

import './SingleMarketPage.css'
import CreateSharesModalButton from "./CreateSharesModal/CreateSharesModal";
import ListShares from "./ListSharesModal/ListSharesModal";
import GuidedListShares from "./GuidedListSharesModal/ListSharesModal";

import HelpModalButton from "./HelpModal/HelpModal";
import OrderBook from "./OrderBook";
import GuidedOrderBook from "./GuidedOrderBook";
import OddsSlider from "./OddsSlider/OddsSlider";
import { showOdds } from "../../utils/showPrices";

const SingleMarketPage = () => {
    const { marketId }  = useParams();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const markets = useSelector((state) => state.markets)
    const [isGuided, setIsGuided] = useState(false);
    const [forecast, setForecast] = useState(null);



    const market = markets.filter(market => parseInt(market.id) === parseInt(marketId))[0]


    // console.log(market.id)
    if(!sessionUser) history.push("/")

    if (market.is_open === false) {
        return (
            <div className="single-market-container">
                <div className="single-market-top">
                    <div className="single-market-title">
                        {market.title}
                    </div>
                    <div className="single-market-below-title">
                        {market.description}
                    </div>
                    <div className="single-market-resolved">
                        This market has resolved to {market.outcome_yes ? "Yes" : "No"}. <br /><br />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="single-market-container">
            <div className="single-market-top">
                <div className="single-market-title">
                    {market.title}
                </div>
                <div className="single-market-below-title">
                    Created by {market.manager.username}. <br />
                    {market.description}
                </div>
                <div className="single-market-button-and-odds">
                    <CreateSharesModalButton market_id={market.id}/>
                    <div className="single-market-odds"> Current Odds: {showOdds(market)}% </div>
                </div>
            </div>
            {
                sessionUser
                    ?
                        <div className="single-market-bottom">
                            <div className="order-book-title">
                                Order Book
                                <HelpModalButton />
                                <div className="toggle-section" >
                                    <ToggleSlider
                                        onToggle={state => {
                                            setIsGuided(state)
                                            setForecast(null)
                                        }}
                                        barBackgroundColorActive="black"
                                    />
                                    <span className="toggle-text">{isGuided ? "Guided" : "Manual"} Mode</span>
                                </div>
                            </div>
                            {isGuided ?
                                <>
                                    <OddsSlider marketOdds={showOdds(market)} setForecast={setForecast}/>
                                    <GuidedOrderBook market={market} forecast={forecast} />
                                    <GuidedListShares market={market} forecast={forecast} />
                                </>
                                :
                                <>
                                    <OrderBook market={market} />
                                    <ListShares market={market} />
                                </>}
                        </div>
                    :
                    ""
            }
        </div>
    )
}

export default SingleMarketPage
