import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import './SingleMarketPage.css'
import CreateSharesModalButton from "./CreateSharesModal/CreateSharesModal";
import OrderBook from "./OrderBook";

const SingleMarketPage = () => {
    const { marketId }  = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const markets = useSelector((state) => state.markets)


    const market = markets.filter(market => parseInt(market.id) === parseInt(marketId))[0]
    // console.log(market.id)

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
                    {market.description}
                </div>
                <CreateSharesModalButton market_id={market.id}/>
            </div>
            <div className="single-market-bottom">
                <div className="single-market-title"> Order Book </div>
                <OrderBook market={market} />
            </div>
        </div>
    )
}

export default SingleMarketPage
