import { useDispatch, useSelector } from "react-redux";
// import SplashImage from "../../assets/splash-front.jpg"
import './SplashPage.css'

const LoggedInPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    let markets = useSelector((state) => state.markets)
    // console.log(markets)
    // console.log(markets[0]["id"])
    markets.sort((a,b) => a["id"] - b["id"])
    console.log(markets)
    // let featuredMarkets = markets.slice(0,4)
    // console.log(featuredMarkets)
    return (
        <>
        hey
        </>
    )

}

export default LoggedInPage
