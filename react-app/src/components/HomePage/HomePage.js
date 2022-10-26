import { useSelector } from "react-redux";
import SplashPage from "./SplashPage";
import LoggedInPage from "./LoggedInPage";

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if(sessionUser){
        return <LoggedInPage />
     }
     else{
         return <SplashPage />
     }

}

export default HomePage
