import { useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"
import backArrow from '../Images/chevron-left-primary.svg'
import stripeImg from '../Images/stripe_payments.svg'
import stripeBtn from '../Images/connect_stripe_buttin.png'


type props = {
    steps: Array<number>,
    setSteps: any,
}

const GuestStep13 = (props: props) => {
    const { steps, setSteps } = props

    const navigate = useNavigate()
    const match = useMatch(`/create-guest/Step13/:id`)

    const [loader, setLoader] = useState<boolean>(false)


    const skipStripe = () => {
        setLoader(true)
        navigate(`/create-guest/last-step/${match?.params.id}`)
        setLoader(false)
    }

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

    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "77%" }}>
                </div>
            </div>
            <div className="row mx-0">
                <div className="col-md-6 py-5 steps-frame-height overflow-y-auto">
                    <div className="col-md-11 col-lg-8 px-md-0 mx-auto d-flex flex-column h-100">
                        <h3 className="heading-big">Connect with Stripe to accept payments</h3>
                        <div className="d-flex align-items-center justify-cont ng-star-inserted">
                            <div className="btn my-3 px-3 position-relative d-flex align-items-center justify-content-center">
                                <img alt="" src={stripeBtn} />
                            </div>

                            <button type="button" className="btn btn-primary skip-btn font-regular my-3 px-3 mr-3" onClick={skipStripe} > Skip for now </button>

                        </div>
                        <div className="d-flex justify-content-between mt-5 border-top">
                            <Link to="">
                                <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                    <img alt="" src={backArrow} className="pr-1" /> Back
                                </button>
                            </Link>
                            <Link to="">
                                <button className="btn my-3 px-3 text-white d-flex align-items-center justify-content-center " style={{ background: "rgb(0, 164, 180)" }}> {!loader ? "Next" : "Loading.."}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img alt="" src={stripeImg} height="250px" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuestStep13