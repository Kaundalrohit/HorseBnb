import { useEffect, useState } from "react";
import './HostyourStalls.css'
import { useMatch, useNavigate } from "react-router-dom";
import HenceForthApi from "../Utils/HenceForthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stall1Img from '../Images/stalls1.png'
import Spinner from "../Spinner/Spinner";


type props = {
    steps: number[],
    setSteps: (value: number[]) => void
}

export default function Stall1(props: props) {
    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch(`/create-stall/step1/:id`)
    let id: any = match?.params?.id
    const navigate = useNavigate()

    const [loader, setLoader] = useState<boolean>(false)
    const [type, setType] = useState<number>(0)
    const [title, setTitle] = useState<string>("")

    const handleSelectChange = (event: any) => {
        setType(parseInt(event.target.value));
    }

    const postStep1Data = async () => {

        try {
            if (type && title && id) {
                setLoader(true)
                let res = await HenceForthApi.Auth.Updatedlisting({
                    title: title,
                    id: id,
                    publicData: {
                        type: type,
                        stepsCompleted: [
                            ...steps, 1
                        ]
                    }
                })
                setLoader(false)
                navigate(`/create-stall/step3/${res.data.id.uuid
                    }`)
            }
            else if (type && title) {
                setLoader(true)
                let res = await HenceForthApi.Auth.createdraftlisting({
                    title: title,
                    publicData: {
                        type: type,
                        stepsCompleted: [
                            ...steps, 1
                        ]
                    }
                })
                setLoader(false)
                navigate(`/create-stall/step3/${res.data.id.uuid
                    }`)
            }
            else {
                toast('🦄 Please fill the details', {
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

        } catch (error) {
            console.log(error);
        }
    }

    const list = async () => {
        if (match?.params?.id) {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
                setType(res?.data?.attributes?.publicData?.type)
                setTitle(res?.data?.attributes?.title)
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        list()
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <section className="createStallStep container-fluid">
                <ToastContainer />
                <div className="createStall container">
                    <div className="row py-5">
                        <div className="col-md-6 col-lg-4 text-start">
                            <h2 className="heading-large mb-3">Hi henceforth, <br /> let's get started listing your space.</h2>
                            <p className="fw-600 mb-1 text-dim">STEP 1</p>
                            <h3 className="heading-big mb-4">What kind of place do you have?</h3>
                            <div className="my-2">
                                <p className="text-danger">Please note if you offer multiple services, you must create an individual listing per category. </p>
                            </div>
                            <div>
                                <form className="form-group">
                                    <select className="form-control mt-4 decorated" disabled={id} name="stallType" onChange={handleSelectChange} value={type}>
                                        <option value='0' >Choose stall type</option>
                                        <option value='1' >Short term stall</option>
                                        <option value='2' >Monthly board</option>
                                    </select>
                                    <h2 className="heading-big mt-4">Create a title for your listing?</h2>
                                    <p>Catch guest's attention with a listing title that highlights what makes your place special. This can not be your business name.</p>
                                    <input type="text" placeholder="Enter title" name="title" className="form-control mt-4" value={title} onChange={(e: any) => {
                                        setTitle(e.target.value);
                                    }} />
                                    <button type="button" className="btn text-white px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center" style={{ background: "rgb(0, 164, 180)" }}
                                        onClick={postStep1Data}
                                        disabled={loader}
                                    >  {!loader ? "continue" : < Spinner />} </button>
                                    <h1>

                                    </h1>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-8 d-flex align-items-center justify-content-center">
                            <img src={Stall1Img} width="500px" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}