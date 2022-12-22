import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi";
import backArrow from '../Images/chevron-left-primary.svg'
import guestSteps from '../Images/guest_steps.png'
import locationIcon from '../Images/near_me.svg'
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../Spinner/Spinner";




type props = {
    steps: Array<number>,
    setSteps: (value: number) => void,
    value: number
}


const GuestStep5 = (props: props) => {
    const { steps, setSteps, value } = props
    const navigate = useNavigate();
    const match = useMatch(`/create-guest/Step5/:id`)

    const [loader, setLoader] = useState<boolean>(false)
    const [geoLoc, setGeoLoc] = useState<any>({
        lat: 0 as number,
        lng: 0 as number
    })

    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);
            setGeoLoc({
                ...geoLoc,
                lat: res?.data?.attributes?.geolocation?.lat,
                lng: res?.data?.attributes?.geolocation?.lng

            })

        } catch (error) {
            console.log(error);
        }
    }

    const handleStep = async (navigation: string) => {
        const list = {
            geolocation: {
                lat: geoLoc.lat,
                lng: geoLoc.lng,
            },
            id: match?.params.id,
            publicData: {
                stepsCompleted: [...steps, 5]
            }
        }
        if (geoLoc.lng > 0) {
            setLoader(true)
            try {
                await HenceForthApi.Auth.Updatedlisting(list)
                setLoader(false)
                navigation === 'Next' ?
                    navigate(`/create-guest/step6/${match?.params?.id
                        }`)
                    :
                    navigate(`/create-guest/last-step/${match?.params?.id
                        }`)
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.warn('Please Select Your Location')
        }

    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);

                console.log("Longitude is :", position.coords.longitude);
                setGeoLoc({
                    ...geoLoc,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            });
        }
        toast.success('Location Saved')
    }

    useEffect(() => {
        listId()
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        { value && handleStep('Last') }
    }, [value])
    return (

        <>
            <div className="row mx-0">
                <ToastContainer autoClose={1000} />
                <div className="col-md-6 py-5 steps-frame-height overflow-y-auto">
                    <div className="col-md-11 col-lg-8 px-0 mx-auto">
                        <h3 className="fw-600 heading-big">Where is your place located?</h3>
                        <div className="location-paragraph ng-star-inserted">
                            <p >Please input your exact address. Guests will not be able to see your exact address until they have made a booking.</p>
                            <button type="button" className=" btn-sky-outline-lg my-3 mb-4 position-relative d-flex align-items-center justify-content-center" onClick={getLocation}>
                                <img src={locationIcon} className="pe-2" />
                                Use Current Location

                            </button>
                            {/* <form className="ng-untouched ng-pristine ng-invalid">
                                <input className="form-control ml-search mt-4 ng-untouched ng-pristine ng-valid pac-target-input" placeholder="Enter a location" />
                                <div className="invalid-feedback d-block">
                                </div>
                            </form> */}
                            <form className="ng-untouched ng-pristine ng-invalid">
                                <div className="d-flex justify-content-between border-top mt-5">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" tabIndex={0} >
                                        <img src={backArrow} className="pr-1" /> Back
                                    </button>


                                    <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center j.ustify-content-center" onClick={() => handleStep('Next')}
                                        disabled={loader}>
                                        {!loader ? "Next" : <Spinner />}
                                    </button>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img src={guestSteps} width="350px" />
                    </div>
                </div>
            </div>


        </>
    )

}
export default GuestStep5