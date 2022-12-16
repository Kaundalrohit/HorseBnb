import { useEffect, useState } from "react";
import HenceForthApi from "../Utils/HenceForthApi";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import horseImg from '../Images/horse_image.png'
import backArrow from '../Images/chevron-left-primary.svg'
type props = {
    steps: any,
    setSteps: any
}

export default function SuccessfullHosting(props: props) {
    const { steps, setSteps } = props
    const navigate = useNavigate()
    const match = useMatch(`/create-stall/sucessfull-hosting/:id`)

    const [check, setCheck] = useState()

    const agreeConditions = async () => {
        if (check) {
            try {
                (await HenceForthApi.Auth.Updatedlisting({
                    id: match?.params.id,
                    publicData: {
                        gotIt: check,
                        stepsCompleted: [
                            ...steps, 15
                        ]
                    }
                }))
                navigate(`/create-stall/step11/${match?.params.id}`)
            }
            catch (error) {
                console.log(error);

            }
        } else {
            toast('🦄 Please agree to the condition', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }

    }

    useEffect(() => {
        const list = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
                setCheck(res?.data?.attributes?.publicData?.gotIt)
            } catch (error) {
                console.log(error);
            }
        }
        list()
        // eslint-disable-next-line 
    }, [])
    return (
        <>
            <div >
                <ToastContainer />
                <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "70%" }}>
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-md-6 py-5 frame-height overflow-y-auto">
                        <div className="col-md-8 px-md-0 mx-auto d-flex flex-column h-100">
                            <h3 className="heading-big mb-4">Successful hosting starts with an accurate calendar</h3>
                            <p className="font-small-bold my-3">Guests will be able to book your listing instantly. By keeping your calendar up to date you will only get bookings when you are able to host. If you make multiple cancellations it could affect your listings ranking and create negative reviews as it causes problems for travellers.</p>
                            <form className="ng-untouched ng-pristine ng-valid">
                                <label htmlFor="calendar_up_to_date" className="tickbox tickbox-sm mt-0 mb-4 text-default"> Got it! I'll keep my calendar up to date.
                                    <input type="checkbox" id="calendar_up_to_date" name="got_it" ng-reflect-name="got_it" checked={check} onChange={(e: any) => {
                                        setCheck(e.target.checked)
                                    }} className="ng-untouched ng-pristine ng-valid" />
                                    <span className="checkmark skyblue"></span>
                                </label>
                            </form>
                            <div className="d-flex justify-content-between mt-5 border-top">
                                <Link to="/create-stall/checkin-and-checkout">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                        <img src={backArrow} className="pr-1" alt="" /> Back
                                    </button>
                                </Link>
                                <button className="btn my-3 px-3 text-white" onClick={agreeConditions} style={{ background: "rgb(0, 164, 180)" }}> Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                        <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                            <img src={horseImg} alt="" width="250px" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}