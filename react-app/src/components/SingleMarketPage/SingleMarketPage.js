import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './SingleMarketPage.css'
import CreateSharesModalButton from "./CreateSharesModal/CreateSharesModal";
import ListShares from "./ListSharesModal/ListSharesModal";
import HelpModalButton from "./HelpModal/HelpModal";
import OrderBook from "./OrderBook";
import { showOdds } from "../../utils/showPrices";

const SingleMarketPage = () => {
    const { marketId }  = useParams();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const markets = useSelector((state) => state.markets)



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
                            <div className="single-market-title"> Order Book <HelpModalButton /></div>
                            <OrderBook market={market} />
                            <ListShares market={market} />
                        </div>
                    :
                    ""
            }
        </div>
    )
}

export default SingleMarketPage
