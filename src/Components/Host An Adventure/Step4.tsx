import { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import adventureExp from '../Images/experience.png'
import backArrow from '../Images/chevron-left-primary.svg'
type props = {
    steps: any
    setSteps: any;
}

const Step4 = (props: props) => {
    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem('token'));
    const match = useMatch(`/add-experience/step4/:id`)
    const navigate = useNavigate()

    const [state, setstate] = useState({
        description: "",
        extra_detail: "",
    })
    const [loader, setLoader] = useState<boolean>(false)

    const updateState = (e: any) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const postStep4Data = async () => {
        if (state.description && state.extra_detail) {
            setLoader(true)
            try {
                (await HenceForthApi.Auth.Updatedlisting({
                    description: state.description,
                    id: match?.params.id,
                    publicData: {
                        extra_detail: state.extra_detail,
                        stepsCompleted: [
                            ...steps,
                            4
                        ]
                    }
                }))
                setLoader(false)
                navigate(`/add-experience/step5/${match?.params.id}`)
            }
            catch (error) {
                console.log(error);

            }
        } else {
            toast('🦄 Please Enter Details', {
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

    const list = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
            setstate({
                ...state,
                description: res?.data?.attributes?.description,
                extra_detail: res?.data?.attributes?.publicData?.extra_detail
            })
        }
        catch (error) {

        }
    }

    useState(() => {
        list()
    })


    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <ToastContainer />
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "50%" }}>
                </div>
            </div>
            <div className="row mx-0">
                <div className="col-md-6 py-5 steps-frame-height h-md-auto overflow-scroll" style={{ height: '91vh' }}>
                    <div className="col-md-11 col-lg-8 px-md-0 mx-auto">
                        <h3 className="heading-big">Describe your adventure</h3>
                        <p className="font-small-bold mb-0">It is very important to describe your adventure in detail This should include start and end times, daily itinerary, what is included and what is not, also what guests should bring and what they shouldn’t. This is very important to streamline your bookings.</p>
                        <div >
                            <textarea rows={5} cols={5} placeholder="Describe your adventure" maxLength={1000} className="form-control " value={state.description} name="description" onChange={(e: any) => updateState(e)}  ></textarea>
                            <small className="d-block text-right float-right total-caracteres"></small>
                            <div className="invalid-feedback d-block">
                            </div>
                            <div className="mt-5">
                                <h4 className="heading-big">Want to add more info?</h4>
                                <p className="mb-4">Use the additional fields below to share more details</p>
                                <textarea rows={5} cols={5} placeholder="Type here..." className="form-control ng-untouched ng-pristine ng-valid" value={state.extra_detail} name="extra_detail" onChange={(e: any) => updateState(e)} >
                                </textarea>
                            </div>

                            <div className="d-flex justify-content-between border-top mt-5">
                                <Link to="">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0">
                                        <img src={backArrow}
                                            alt="" className="pr-1" /> Back
                                    </button>
                                </Link>
                                {/* <Link to="/add-experience/step5"> */}
                                <button className="btn my-3 px-3 text-white"
                                    onClick={postStep4Data}
                                    style={{ background: "rgb(0, 164, 180)" }}> {!loader ? "Next" : "Loading.."}
                                </button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img src={adventureExp} width="250px" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Step4