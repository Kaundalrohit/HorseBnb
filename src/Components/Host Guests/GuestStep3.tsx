import { count } from "console";
import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import HenceForthApi from "../Utils/HenceForthApi";
import backArrow from '../Images/chevron-left-primary.svg'
import guestSteps from '../Images/guest_steps.png'
import removeImg from '../Images/remove_circle_outline.svg'
import addImg from '../Images/add_circle_outline.svg'


type props = {
    steps: any,
    setSteps: any
}
const GuestStep3 = (props: props) => {

    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem('token'))
    const navigate = useNavigate();
    const match = useMatch(`/create-guest/Step3/:id`)

    let [count, setCount] = useState<number>(0)
    const [loader, setLoader] = useState<boolean>(false)


    const setRoomCount = async () => {
        const list = {
            id: match?.params.id,
            publicData: {
                rooms: count,
                stepsCompleted: [...steps, 3, 5]
            }
        }
        if (count && count !== 0) {
            setLoader(true)
            try {
                await HenceForthApi.Auth.Updatedlisting(list)
                setLoader(false)
                navigate(`/create-guest/step5/${match?.params.id}`)
            } catch (error) {
                console.log(error);
            }
        } else {
            toast('Please fill  count', {
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
    }


    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);
            setCount(res?.data?.attributes?.publicData?.rooms);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listId()
        // eslint-disable-next-line 
    }, [])


    return (

        <>
            <div className="row mx-0 h-100">
                <ToastContainer />
                <div className="col-md-6 py-5 px-md-0 steps-frame-height overflow-y-auto">
                    <div className="col-md-11 col-lg-8 mx-auto px-md-0 d-flex flex-column h-100">
                        <h3 className="fw-600 heading-big mb-5">How many rooms can you accommodate?</h3>
                        <div className="d-flex justify-content-between align-items-baseline room-input mb-2">
                            <h5 className="font-medium-bold">Rooms</h5>
                            <div className="input-group d-flex justify-content-end">
                                <div className="input-group-prepend">
                                    <button className="btn border-0" onChange={(e: any) => { setCount(e.target.value) }} onClick={() => { setCount(count - 1) }} disabled={count === 0}>
                                        <img src={removeImg} alt="" width="18px" />
                                    </button>
                                </div>
                                <input type="text" className=" form-control text-center" value={count} style={{ flex: "0.1 1 auto" }} />
                                <div className="input-group-prepend">
                                    <button className="btn border-0" onClick={() => { setCount(count + 1) }} onChange={(e: any) => { setCount(e.target.value) }}>

                                        <img src={addImg} alt="" width="18px" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5"> Note : Occupancy of 2 guests in a room.</div>
                        <hr />
                        <div className="d-flex justify-content-between mt-auto border-top">
                            <button type="button" className="btn btn-transparent font-regular px-0 my-3" tabIndex={0}  >
                                <img src={backArrow} className="pr-1" />
                                Back
                            </button>

                            <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={setRoomCount}> {!loader ? "Next" : "Loading.."}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="h-100 d-flex py-5 align-items-center bg-light justify-content-center">
                        <img src={guestSteps} width="350px" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default GuestStep3