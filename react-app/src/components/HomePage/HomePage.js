import { useDispatch, useSelector } from "react-redux";
import SplashPage from "./SplashPage";


const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if(sessionUser){
        return <>Logged In</>
     }
     else{
         return <SplashPage />
     }

}

export default HomePage
