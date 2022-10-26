// import { useDispatch, useSelector } from "react-redux";
// import SplashImage from "../../assets/splash-front.jpg"
import './SplashPage.css'

const SplashPage = () => {
    // const sessionUser = useSelector((state) => state.session.user);

    const fixed_data = {
        "Elon Musk CEO of A/a" : {
            "imgUrl" : "https://images.pexels.com/photos/8474432/pexels-photo-8474432.jpeg",
            "yes" : 61,
            "no" : 29,
            "marketUrl" : "",
        },
        "Austen Allred Arrested" : {
            "imgUrl" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs1.ibtimes.com%2Fsites%2Fwww.ibtimes.com%2Ffiles%2Fstyles%2Fembed%2Fpublic%2F2020%2F12%2F15%2Fausten-allred-ceo-lambda-school.jpg",
            "yes" : 10,
            "no" : 90,
            "marketUrl" : "",
        },
        "Clones of Etsy July Cohort" : {
            "imgUrl" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstorage.needpix.com%2Frsynced_images%2Fjewelry-parts-spring-ring.jpg",
            "yes" : 10,
            "no" : 90,
            "marketUrl" : "",
        },
        "June Students Graduating 90%" : {
            imgUrl : "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg",
            "yes" : 55,
            "no" : 45
        },
        "Strikes Given Dec 2022" : {
            imgUrl : "https://images.pexels.com/photos/2228568/pexels-photo-2228568.jpeg",
            "yes" : 33,
            "no" : 67
        },
        "Job Placement Rate June Cohort 95%" : {
            imgUrl : "https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg",
            "yes" : 5,
            "no" : 95
        },
    }


    return (
        <div className="splash-container">
            <div className="splash-banner">
                Predict Things and Win Bragging Rights!
            </div>
            <div className="splash-smaller">
                <div className="splash-left">
                    <div className="splash-left-big-text">
                        Put Your Fake Money Where Your Mouth Is.
                    </div>
                    <div className="splash-left-small-text">
                        Trade on Real-World Outcomes!
                    </div>
                </div>
                <div className="splash-right">
                    {
                        Object.keys(fixed_data).map(name => {
                            return (
                                <div className='splash-card-wrapper'>
                                    <div className='splash-card'>
                                    <img className='splash-card-image' alt="" src={fixed_data[name]["imgUrl"]}></img>
                                    <div className='splash-card-title'> {name} </div>
                                    <div className='splash-card-resolves'> Oct 31 </div>
                                    <div className='splash-yes-no'>
                                        <div className='splash-yes'> Yes {fixed_data[name]["yes"]}¢</div>
                                        <div className='splash-no'> No {fixed_data[name]["no"]}¢</div>
                                    </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
            </div>
        </div>
    )

}

export default SplashPage
