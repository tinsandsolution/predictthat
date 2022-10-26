import { useDispatch, useSelector } from "react-redux";
import './LoggedInPage.css'

const LoggedInPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    let markets = useSelector((state) => state.markets)
    markets.sort((a,b) => a["id"] - b["id"])

    let featureMarkets = markets.slice(0,4)

    const makeFeaturedCards = (markets) => {
        return (
            <>
            {markets.map(market => {

                let yesno = (
                    <>
                        <div className='splash-yes'> Yes {market.yes_value}¢</div>
                        <div className='splash-no'> No {market.no_value}¢</div>
                    </>
                )

                if (market.yes_value === 0 && market.no_value === 0) {
                    yesno = (
                        <div className="featured-none-at-all">No Bets Yet</div>
                    )
                }

                return (
                    <div className='featured-card-wrapper'>
                        {/* <div className='splash-card'> */}
                        <img className='featured-card-image' alt="" src={market["image_url"]}></img>
                        <div className="featured-card-right">
                            <div className='featured-card-title'> {market["short_title"]} </div>
                            <div className='splash-card-resolves'> {market.expected_resolution_time === null ? "Ongoing" : market.expected_resolution_time} </div>
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
            <div className="logged-in-header">
                Featured Markets
                <div className="featured-markets">
                    {makeFeaturedCards(featureMarkets)}
                </div>
            </div>
        </div>
    )

}

export default LoggedInPage
