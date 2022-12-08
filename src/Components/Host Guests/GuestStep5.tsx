import { useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi";

type props = {
    steps: Array<number>,
    setSteps: any,
}


const GuestStep5 = (props: props) => {
    const { steps, setSteps } = props
    const navigate = useNavigate();
    const match = useMatch(`/create-guest/Step5/:id`)



    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // getStartedShow()
        listId()
        // eslint-disable-next-line 
    }, [])


    const handleStep = () => {
        navigate(`/create-guest/step6/${match?.params.id}`)
    }

    return (

        <>
            <div className="row mx-0">
                <div className="col-md-6 py-5 steps-frame-height overflow-y-auto">
                    <div className="col-md-11 col-lg-8 px-0 mx-auto">
                        <h3 className="fw-600 heading-big">Where is your place located?</h3>
                        <div className="location-paragraph ng-star-inserted">
                            <p >Please input your exact address. Guests will not be able to see your exact address until they have made a booking.</p>
                            <button type="button" className="btn btn-primary lg my-3 mb-4 position-relative d-flex align-items-center justify-content-center">
                                <img src="https://horsebnb.com/assets/img/near_me.svg" className="pr-2" />
                                Set Your Location

                            </button>
                            <form className="ng-untouched ng-pristine ng-invalid">
                                <input className="form-control ml-search mt-4 ng-untouched ng-pristine ng-valid pac-target-input" placeholder="Enter a location" />
                                <div className="invalid-feedback d-block">
                                </div>
                            </form>
                            <form className="ng-untouched ng-pristine ng-invalid">
                                <div className="d-flex justify-content-between border-top mt-5">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" tabIndex={0} >
                                        <img src="https://horsebnb.com/assets/img/chevron-left-primary.svg" className="pr-1" /> Back
                                    </button>


                                    <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={handleStep}>
                                        Next
                                    </button>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img src="https://horsebnb.com/assets/img/guest_steps.png" width="350px" />
                    </div>
                </div>
            </div>


        </>
    )

}
export default GuestStep5