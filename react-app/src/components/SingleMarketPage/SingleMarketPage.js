import { useSelector } from "react-redux";
// import SplashPage from "./SplashPage";
// import LoggedInPage from "./LoggedInPage";

const SingleMarketPage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <>dfdafs</>
    )
    if(sessionUser){
        // return <LoggedInPage />
     }
     else{
        //  return <SplashPage />
     }

}

export default SingleMarketPage
