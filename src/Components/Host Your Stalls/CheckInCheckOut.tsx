import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import horseImg from '../Images/horse_image.png'
import backArrow from '../Images/chevron-left-primary.svg'

type props = {
    steps: any,
    setSteps: any
}

export default function CheckInCheckOut(props: props) {
    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch('/create-stall/checkin-and-checkout/:id')
    const navigate = useNavigate()

    useEffect(() => {
        const list = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
            } catch (error) {
                console.log(error);
            }
        }
        list()
        // eslint-disable-next-line 
    }, [])

    const [state, setstate] = useState({
        arrive: "",
        leave: ""
    })
    const updateState = (e: any) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const postStep9Data = async () => {
        if (state.arrive && state.leave) {
            try {
                (await HenceForthApi.Auth.Updatedlisting({
                    id: match?.params.id,
                    publicData: {
                        arrive_after: state.arrive,
                        leave_before: state.leave,
                        stepsCompleted: [
                            ...steps, 10
                        ]
                    }

                }))
                navigate(`/create-stall/sucessfull-hosting/${match?.params.id}`)
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

    return (
        <>
            <div >
                <ToastContainer />
                <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "60%" }}>
                    </div>
                </div>
                <div className="row mx-0 h-100">
                    <div className="col-md-6 py-5 px-md-0 frame-height overflow-y-auto">
                        <div className="col-md-8 mx-auto d-flex flex-column h-100">
                            <h4 className="fw-600 heading-big text-black mb-1">Check In &amp; Check Out</h4>
                            <p className="font-small-bold my-2">Choose a time for Check-in and Check-out</p>
                            <div className="form-group">
                                <label htmlFor="arrive_after" className="font-small-bold w-100">Arrive After <input type="time" value={state.arrive} name="arrive" onChange={updateState} className="form-control" /></label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="arrive_after" className="font-small-bold w-100">Leave Before <input type="time" value={state.leave} name="leave" onChange={updateState} className="form-control" /></label>
                            </div>
                            <div className="d-flex justify-content-between border-top mt-5">
                                <Link to="/create-stall/step8">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                        <img src={backArrow} className="pr-1" alt="" /> Back
                                    </button>
                                </Link>
                                {/* <Link to="/create-stall/sucessfull-hosting"> */}
                                <button className="btn my-3 px-3 text-white" onClick={postStep9Data} style={{ background: "rgb(0, 164, 180)" }}> Next
                                </button>
                                {/* </Link> */}
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