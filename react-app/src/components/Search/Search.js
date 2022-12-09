import { connect, useSelector } from "react-redux"
import { useLocation, withRouter } from "react-router-dom"


const Search = () => {
    const { search } = useLocation();
    const raw = String(new URLSearchParams(search)).slice(2)
    const terms = raw.split("+")
    let markets = useSelector((state) => state.markets)

    return (
        <>
        {terms[0]}
        </>

    )
}

export default withRouter(connect()(Search))
