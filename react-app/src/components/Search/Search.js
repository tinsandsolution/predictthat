import { connect, useSelector } from "react-redux"
import { useLocation, withRouter } from "react-router-dom"


const filterMarkets = (terms, markets) => {
    terms = terms.map(term => term.toLowerCase())

    return markets.filter(market => {
        for (let term of terms) {
            let nonalpha = /[^A-Za-z0-9]/g
            let marketWords = [...market.description.split(" "),...market.title.split(" ")]
            marketWords = marketWords.map(marketWord => marketWord.replace(nonalpha, "").toLowerCase())

            if (marketWords.includes(term)) return true
        }
        return false
    })
}



const Search = () => {
    const { search } = useLocation();
    const raw = String(new URLSearchParams(search)).slice(2)
    const terms = raw.split("+")
    let markets = useSelector((state) => state.markets)

    const filteredMarkets = filterMarkets(terms, markets)
    console.log(filteredMarkets)
    return (
        <>
        {terms[0]}
        </>

    )
}

export default withRouter(connect()(Search))
