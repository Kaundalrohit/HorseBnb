import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import backArrow from '../Images/chevron-left-primary.svg'
import bulbImg from '../Images/lightbulb.svg'

type props = {
    steps: any,
    setSteps: any
}

export default function Stalls12(props: props) {
    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch('/create-stall/step12/:id')
    const navigate = useNavigate()

    const [price, setPrice] = useState<number>()
    const [check, setCheck] = useState<any>()

    const poststep12Data = async () => {
        if (price) {
            try {
                (await HenceForthApi.Auth.Updatedlisting({
                    id: match?.params.id,
                    price: {
                        amount: "",
                        currency: "USD"
                    },
                    publicData: {
                        bookingAcceptType: check,
                        listing_price: price,
                        stepsCompleted: [
                            ...steps, 14
                        ]
                    }
                }))
                navigate(`/create-stall/step13/${match?.params.id}`)
            }
            catch (error) {
                console.log(error);
            }
        } else {
            toast('🦄 Please Choose Your Time Slot', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    useEffect(() => {
        const list = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
                setPrice(res?.data?.attributes?.publicData?.listing_price)
                setCheck(res?.data?.attributes?.publicData?.bookingAcceptType)
            } catch (error) {
                console.log(error);
            }
        }
        list()
        // eslint-disable-next-line 
    }, []);

    return (
        <>
            <div >
                <ToastContainer />
                <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "90%" }}>
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-lg-6 py-5 steps-frame-height overflow-y-auto">
                        <div className="col-lg-8 col-md-11 px-md-0 mx-auto d-flex flex-column h-100">
                            <h3 className="heading-big">Price your stall.</h3>
                            <span className="font-small mb-2 d-block"> This will be your nightly price per stall </span>
                            <div className="input-group mb-3 mh-40">
                                <div className="input-group-prepend">
                                    <span className="input-group-text dollar">$</span>
                                </div>
                                <input type="number" value={price} name="num" onChange={(e: any) => setPrice(e.target.value)} placeholder="" className="form-control dollar ng-untouched ng-pristine ng-valid" />
                            </div>
                            <div className="mt-3">
                                <div>
                                    <h5 className="pb-2">Do you want to allow guests to make instant bookings?
                                    </h5>
                                </div>
                                <div >
                                    <label htmlFor="radio-three" className="radio-lable px-3 d-flex position-relative align-items-center">
                                        <span className="ml-3 font-medium">Yes</span>
                                        <input type="radio" id="radio-three" value={1} checked={check == 1} onChange={(e: any) => {
                                            setCheck(e.target.value);
                                            console.log(e.target.value)
                                        }
                                        } name='radio-btn' />
                                        <span className="radio-checkmark"></span>
                                    </label>
                                    <label htmlFor="radio-four" className="radio-lable px-3 d-flex position-relative align-items-center">
                                        <span className="ml-3 font-medium">No</span>
                                        <input type="radio" id="radio-four" value={2} checked={check == 2} onChange={(e: any) => {
                                            setCheck(e.target.value);
                                            console.log(e.target.value)
                                        }} name='radio-btn' />
                                        <span className="radio-checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-5 border-top">
                                <Link to="/create-stall/step11">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                        <img src={backArrow} className="pr-1" alt="" /> Back
                                    </button>
                                </Link>
                                <button className="btn my-3 px-3 text-white" onClick={poststep12Data} style={{ background: "rgb(0, 164, 180)" }}> Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-md-0 d-none d-lg-block">
                        <div className="py-5 h-100 d-flex align-items-start px-md-5 bg-light justify-content-start">
                            <div className="border col-md-7 px-4 py-4 mb-4 bg-white">
                                <img src={bulbImg} height="32px" className="mb-4" alt="" />
                                <h6 className="fw-600">Start with a lower price to attract bookings</h6>
                                <p className="font-small mb-0">We suggest starting with a competitive price as you are new to the website. This will help you develop a good reputation and get some guest reviews to help with future bookings.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}