import { connect, useSelector } from "react-redux"
import { useHistory, useLocation, withRouter } from "react-router-dom"
import { showOdds, showSearchPrices } from "../../utils/showPrices"
import './Search.css'


const filterMarkets = (terms, markets) => {

    terms = terms.map(term => term.toLowerCase())

    return markets.filter(market => {
        for (let term of terms) {
            let nonalpha = /[^A-Za-z0-9]/g
            let marketWords = [...market.description.split(" "),...market.title.split(" "),...market.short_title.split(" ")]
            marketWords = marketWords.map(marketWord => marketWord.replace(nonalpha, "").toLowerCase())

            if (marketWords.includes(term)) return true
        }
        return false
    })
}

const CreateCards = (markets) => {
    const history = useHistory();

    return (
        <>
        {markets.map(market => {

            return (
                <div className="search-card" onClick={()=> history.push("/markets/" + market.id)}>

                    <div className="top">
                        <div className="title"> {market.short_title} </div>
                    </div>

                    <div className="bottom">
                        {showSearchPrices(market)}
                        <div className="odds"> {showOdds(market)}% Likely </div>
                    </div>
                </div>
            )
        })}
        </>
    )
}

const Search = () => {

    let markets = useSelector((state) => state.markets)

    const { search } = useLocation();
    const raw = String(new URLSearchParams(search)).slice(2)
    const terms = raw.split("+")


    const filteredMarkets = filterMarkets(terms, markets)

    return (
        <div className="search-results">
        {CreateCards(markets)}
        </div>

    )
}

export default withRouter(connect()(Search))
