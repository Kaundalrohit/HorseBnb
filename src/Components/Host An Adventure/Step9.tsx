
import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import backArrow from '../Images/chevron-left-primary.svg'
import stripeImg from '../Images/stripe_payments.svg'
import stripeBtn from '../Images/connect_stripe_buttin.png'
import Spinner from "../Spinner/Spinner";

type props = {
    steps: any
    setsteps: any
    value: number
}
const Step9 = (props: props) => {
    const { steps, setsteps, value } = props

    const match = useMatch('/add-experience/step9/:id')
    const navigate = useNavigate()

    const [loader] = useState<boolean>(false)

    const list = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setsteps(res.data.attributes.publicData.stepsCompleted)
        }
        catch (error) {

        }
    }


    const handlePayment = () => {
        toast('🦄 Please connect your stripe account to step forward', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const skipStripe = (navigation: string) => {
        {
            navigation === 'Next' ?
                navigate(`/add-experience/last-step/${match?.params.id}`)
                :
                navigate(`/add-experience/last-step/${match?.params.id}`)
        }
    }


    useEffect(() => {
        list()
    }, [])

    useEffect(() => {
        { value && skipStripe('Last') }
    }, [value])

    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <ToastContainer />
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "95%" }}>
                </div>
            </div>
            <div className="row mx-0">
                <div className="col-md-6 py-5 steps-frame-height overflow-y-auto">
                    <div className="col-md-11 col-lg-8 px-md-0 mx-auto d-flex flex-column h-100">
                        <h3 className="heading-big">Connect with Stripe to accept payments</h3>
                        <div className="d-flex align-items-center justify-cont ng-star-inserted">
                            <div className="my-3 px-3 position-relative d-flex align-items-center justify-content-center">
                                <img src={stripeBtn} alt="" />
                            </div>
                            <button type="button" className="btn  text-white skip-btn font-regular my-3 px-3 mr-3"
                                style={{ background: "rgb(0, 164, 180)" }} onClick={() => skipStripe('Next')} > Skip for now </button>
                        </div>
                        <div className="d-flex justify-content-between mt-5 border-top">

                            <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                <img src={backArrow} className="pr-1" alt="" /> Back
                            </button>

                            <button className="btn my-3 px-3 text-white" onClick={handlePayment} style={{ background: "rgb(0, 164, 180)" }}
                                disabled={loader}
                            > {!loader ? "Next" : <Spinner />}
                            </button>

                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img src={stripeImg} alt="" height="250px" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Step9