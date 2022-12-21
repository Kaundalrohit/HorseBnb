import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import backArrow from '../Images/chevron-left-primary.svg'

type props = {
    steps: any,
    setSteps: any
    value: number
}

export default function Stalls11(props: props) {
    const { steps, setSteps, value } = props
    const match = useMatch('/create-stall/step11/:id')
    const navigate = useNavigate()
    const [date, setDate] = useState<string | number>()
    const [loader, setLoader] = useState<boolean>(false)


    const uploadStep11Data = async (navigation: string) => {
        try {
            setLoader(true)
            await HenceForthApi.Auth.Updatedlisting({
                id: match?.params.id,
                publicData: {
                    stepsCompleted: [
                        ...steps, 11
                    ]
                }
            })
            setLoader(false)
            {
                navigation === 'Next' ? navigate(`/create-stall/step12/${match?.params.id}`)
                    : navigate(`/create-stall/last-step/${match?.params.id}`)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const list = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
                // setDate()
            } catch (error) {
                console.log(error);
            }
        }
        list()
        // eslint-disable-next-line 
    }, [])
    useEffect(() => {
        { value && uploadStep11Data('Last') }
    })

    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <ToastContainer />
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "80%" }}>
                </div>
            </div>
            <div>
                <div className="row mx-0 h-100">
                    <div className="col-md-6 py-5 steps-frame-height overflow-y-auto d-flex flex-column">
                        <div className="heading text-center">
                            <h2>Set your availability</h2>
                        </div>
                        <div className="text-center my-5">
                            <input type="date" value={date} onChange={(e: any) => setDate(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-between mt-5 border-top">
                            <Link to="/create-stall/sucessfull-hosting">
                                <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                    <img src={backArrow} className="pr-1" alt="" /> Back
                                </button>
                            </Link>
                            {/* <Link to={`/create-stall/step12/${match?.params.id}`}> */}
                            <button className="btn my-3 px-3 text-white"
                                onClick={() => uploadStep11Data('Next')}
                                style={{ background: "rgb(0, 164, 180)" }}> {!loader ? "Next" : "Loading....."}
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>
                    <div className="col-md-6 px-md-0 d-none d-md-block">
                        <div className="py-5 h-100 d-flex align-items-start px-md-5 bg-light justify-content-start">
                            <div className="border col-md-8 px-4 py-4 mb-4 bg-white">
                                <img src="https://horsebnb.com/assets/img/lightbulb.svg" height="32px" className="mb-4" alt="" />
                                <p className="font-small">Important! Your calendar default set up is to show as available for the next 90 days. If you are unable to host any of those days please make sure to block off those days on your calendar so you don’t get any unwanted bookings.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}