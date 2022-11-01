import { useDispatch, useSelector } from "react-redux";
import './LoggedInPage.css'
import { useHistory } from 'react-router-dom';
import { showPrices } from "../../utils/showPrices";

const LoggedInPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    let markets = useSelector((state) => state.markets)
    const history = useHistory();

    markets.sort((a,b) => a["id"] - b["id"])

    let featureMarkets = markets.slice(0,4)
    let restMarkets = markets.slice(4)
    restMarkets.reverse()

    const makeRegularCards = (markets) => {
        return (
            <>
            {markets.map(market => {

                const i = markets.findIndex((ele) => ele === market)

                // let i = 1

                let yesno = showPrices(market)

                return (
                    <div key={market["short_title"]} className='rest-card-wrapper' onClick={()=> history.push("/markets/" + market.id)}>
                    <div className='rest-card'>
                        <div className="rest-card-left">
                            <div className='rest-card-title'> <span> {market["short_title"]} </span>  </div>
                            {/* <div className='rest-card-resolves'> {market.expected_resolution_time === null ? "Ongoing" : market.expected_resolution_time} </div> */}
                            <div className='rest-card-resolves'> {market.is_open === true ? "Ongoing" : ""} </div>

                            <div className='rest-yes-no'>
                                {yesno}
                            </div>
                        </div>
                        <div className={i % 2 === 0 ? "rest-card-right" : "rest-card-right nb"}>
                            <img className='rest-card-image' alt="" src={market["image_url"]} onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}></img>
                        </div>
                     </div>
                    </div>
                )

            })}
            </>
        )
    }


    const makeFeaturedCards = (markets) => {
        return (
            <>
            {markets.map(market => {

                const i = markets.findIndex((ele) => ele === market)

                let yesno = showPrices(market)

                return (
                    <div key={market["short_title"]} className='featured-card-wrapper' onClick={()=> history.push("/markets/" + market.id)}>
                        {/* <div className='splash-card'> */}
                        <img className='featured-card-image' alt="" src={market["image_url"]} onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}></img>
                        <div className={i !== 3 ? "featured-card-right" : "featured-card-right nb"}>
                            <div className='featured-card-title'> <span> {market["short_title"]} </span> </div>
                            {/* <div className='featured-card-resolves'> {market.expected_resolution_time === null ? "Ongoing" : market.expected_resolution_time} </div> */}
                            <div className='featured-card-resolves'> {market.is_open === true ? "Ongoing" : ""} </div>

                            <div className='featured-yes-no'>
                                {yesno}
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                )

            })}
            </>
        )
    }

    return (
        <div className="logged-in-container">
            <div>
                <div className="logged-in-header">
                    Featured Markets
                </div>
            </div>
            <div className="featured-markets">
                    {makeFeaturedCards(featureMarkets)}
            </div>
            <div className="logged-in-header2">
                Recently Added
            </div>
            <div className="rest-markets">
                    {makeRegularCards(restMarkets)}
            </div>
        </div>
    )

}

export default LoggedInPage
