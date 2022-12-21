import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import horseImg from '../Images/horse_image.png'
import removeImg from '../Images/remove_circle_outline.svg'
import addImg from '../Images/add_circle_outline.svg'
import backArrow from '../Images/chevron-left-primary.svg'
import Spinner from "../Spinner/Spinner";

type props = {
    steps: any,
    setSteps: any
    value: number
}

export default function Stall3(props: props) {
    const { steps, setSteps, value } = props

    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch(`/create-stall/step3/:id`)
    const navigate = useNavigate();

    const [count, setCount] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false)


    const entries = [
        {
            dayOfWeek: "sun",
            seats: count
        },
        {
            dayOfWeek: "mon",
            seats: count
        },
        {
            dayOfWeek: "tue",
            seats: count
        },
        {
            dayOfWeek: "wed",
            seats: count
        },
        {
            dayOfWeek: "thu",
            seats: count
        },
        {
            dayOfWeek: "fri",
            seats: count
        },
        {
            dayOfWeek: "sat",
            seats: count
        }

    ]

    const postStep3Data = async (navigation: string) => {

        const list = {
            availabilityPlan: {
                entries,
                type: "availability-plan/day"
            },
            id: match?.params.id,
            publicData: {
                guests: 0,
                property_subtype: 2,
                property_type: 2,
                stalls: count,
                stepsCompleted: [
                    ...steps, 3
                ]
            }
        }
        if (count) {
            setLoader(true)
            try {
                await HenceForthApi.Auth.Updatedlisting(list)
                setLoader(false)
                {
                    (navigation === 'Next') ?
                        navigate(`/create-stall/step5/${match?.params.id}`)
                        :
                        navigate(`/create-stall/last-step/${match?.params.id}`)
                }

            }
            catch (error: any) {
                console.log(error);
            }
        } else {
            toast('🦄 Please fill Numbers of Stalls', {
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
    }

    useEffect(() => {
        const list = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
                setCount(res?.data?.attributes?.publicData?.stalls)
            } catch (error) {
                console.log(error);
            }
        }
        list()
        // eslint-disable-next-line 
    }, [])
    useEffect(() => {

        (value &&
            postStep3Data('Last'))


    }, [value])
    return (
        <>
            <section className="stall_step3">
                <ToastContainer />
                <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "10%" }}>
                    </div>
                </div>
                <div className="row mx-0 h-100">
                    <div className="col-md-6 text-start pt-5 px-0 outer_location overflow-scroll">
                        <div className="col-md-11 col-lg-8 mx-auto px-0 d-flex flex-column ">
                            <h3 className="fw-600 heading-big">How many horses can your barn accommodate?</h3>
                            <p className="font-small-bold mb-4">Check that you have enough stalls.</p>
                            <div className="d-flex mb-0 pt-1">
                                <h5 className="font-medium-bold">Stalls</h5>
                                <div className="input-group d-flex justify-content-end">
                                    <div className="input-group-prepend">
                                        <button className="btn border-0" onClick={() => {
                                            setCount(count - 1)
                                        }}
                                            disabled={count === 0}
                                        >
                                            <img src={removeImg} alt="" width="18px" />
                                        </button>
                                    </div>
                                    <input type="text" className=" form-control text-center border-1" value={count} style={{ flex: "0.1 1 auto" }} />
                                    <div className="input-group-prepend">
                                        <button className="btn border-0" onClick={() => {
                                            setCount(count + 1)
                                        }}>
                                            <img src={addImg} alt="" width="18px" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-5 py-5 border-0" />
                            <div className="d-flex justify-content-between mt-5 mb-0 border-top">
                                <Link to="/create-stall/step1" >
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                        <img src={backArrow} className="pr-1" alt="" /> Back
                                    </button>
                                </Link>
                                {/* <Link to="/create-stall/step5"> */}
                                <button className="btn my-3 px-3 text-white d-flex align-items-center justify-content-center" onClick={() => postStep3Data('Next')} style={{ background: "rgb(0, 164, 180)" }} disabled={loader} >

                                    {!loader ? "Next" : <Spinner />}</button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center px-0">
                        <div className="h-100 d-flex py-5 align-items-center border-start justify-content-center">
                            <img src={horseImg} alt="" width="250px" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}