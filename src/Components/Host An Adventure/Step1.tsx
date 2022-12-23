import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adventureExp from '../Images/experience.png'
import Spinner from "../Spinner/Spinner";

type props = {
    steps: any
}

const Step1 = ({ steps }: props) => {

    HenceForthApi.setToken(localStorage.getItem("token"))
    const navigate = useNavigate()
    const match = useMatch('/add-experience/step1/:id');
    let id = match?.params?.id


    const [title, setTitle] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)


    const postStep1Data = async () => {
        try {
            if (title && id) {
                setLoader(true)
                let res = await HenceForthApi.Auth.Updatedlisting({
                    title: title,
                    id: id,
                    publicData: {
                        stepsCompleted: [
                            ...steps, 1
                        ]
                    }
                })
                setLoader(false)
                navigate(`/add-experience/step2/${res.data.id.uuid
                    }`)
            }
            else if (title) {
                setLoader(true)
                let res = await HenceForthApi.Auth.createdraftlisting({
                    title: title,
                    publicData: {
                        type: 4,
                        stepsCompleted: [
                            ...steps, 1
                        ]
                    }
                })
                setLoader(false)
                navigate(`/add-experience/step2/${res.data.id.uuid
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

    const listId = async () => {
        if (match?.params?.id) {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                // setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
                setTitle(res?.data?.attributes?.title)
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        listId()
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <div className="">
                <ToastContainer />
                <div >
                    <div className="row mx-0">
                        <div className="col-md-6 py-5 steps-frame-height overflow-y-auto">
                            <div className="col-lg-8 col-md-11 px-0 mx-auto d-flex flex-column h-100">
                                <h4 className="heading-big text-black">Start creating your Horse Adventure!</h4>
                                <p className="mb-1">Please create a catchy and descriptive title for your listing. This is the first thing potential guests will see so try and stand out from the crowd.</p>
                                <div className="mt-4">
                                    <input type="text" placeholder="Please enter title" maxLength={50} className="form-control firstLetterCapital ng-pristine ng-invalid ng-touched" value={title} onChange={(event: any) => { setTitle(event.target.value) }} />
                                    <div className="invalid-feedback d-block">
                                    </div>
                                </div>
                                <div className="">
                                    <button type="button"
                                        onClick={postStep1Data} className="btn btn-primary btn-sm mt-2"
                                        disabled={loader}
                                    > {!loader ? "continue" : <Spinner />} </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                            <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                                <img src={adventureExp} width="350px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Step1