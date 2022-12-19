import { useState, useEffect } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import HenceForthApi from "../Utils/HenceForthApi"
import backArrow from '../Images/chevron-left-primary.svg'
import horseImg from '../Images/horse_image.png'



type props = {
    steps: Array<number>,
    setSteps: any,
}
const GuestCheckIn = (props: props) => {

    const { steps, setSteps } = props

    const navigate = useNavigate()
    const match = useMatch(`/create-guest/checkin-and-checkout/:id`)

    const [arrive, setArrive] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)
    const [leave, setLeave] = useState<string>("")

    const uploadTimings = async () => {
        const list = {
            id: match?.params.id,
            publicData: {
                arrive_after: arrive,
                leave_before: leave,
                stepsCompleted: [...steps, 14],
            }
        }
        try {
            if (arrive && leave) {
                setLoader(true)
                await HenceForthApi.Auth.Updatedlisting(list)
                setLoader(false)
                navigate(`/create-guest/sucessfull-hosting/${match?.params.id}`)
            } else {
                toast('Select Timmings', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }
        } catch (error) {
        }
    }

    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);
            setArrive(res?.data?.attributes?.publicData?.arrive_after);
            setLeave(res?.data?.attributes?.publicData?.leave_before);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listId()
    }, [])

    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "49%" }}>
                </div>
            </div>
            <div className="row">
                <ToastContainer />

                <div className="col-md-6 py-5 px-md-0 frame-height overflow-y-auto">
                    <div className="col-md-8 mx-auto d-flex flex-column h-100">
                        <h4 className="fw-600 heading-big text-black mb-1">Check In &amp; Check Out</h4>
                        <p className="font-small-bold my-2">Choose a time for Check-in and Check-out</p>
                        <div className="form-group">
                            <label htmlFor="arrive_after" className="font-small-bold w-100">Arrive After
                                <input type="time" className="form-control" value={arrive} onChange={(e: any) => setArrive(e.target.value)} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="arrive_after" className="font-small-bold w-100">Leave Before
                                <input type="time" className="form-control" value={leave} onChange={(e: any) => setLeave(e.target.value)} />
                            </label>
                        </div>
                        <div className="d-flex justify-content-between border-top btn-footer mt-auto">
                            <Link to={""}>    <button type="button" className="btn btn-transparent font-regular my-3" tabIndex={0} >
                                <img src={backArrow} alt="" className="pr-1" />
                                Back
                            </button>
                            </Link>

                            <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={uploadTimings} >
                                {!loader ? "Next" : "Loading.."}
                            </button>

                        </div>
                    </div>
                </div>
                <div className="col-lg-6 text-center px-0">
                    <div className="h-100 d-flex py-5 align-items-center border-start justify-content-center">
                        <img src={horseImg} alt="" width="250px" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default GuestCheckIn