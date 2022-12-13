import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adventureExp from '../Images/experience.png'

type props = {
    adSteps: any
}

const Step1 = ({ adSteps }: props) => {

    HenceForthApi.setToken(localStorage.getItem("token"))
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")


    const postStep1Data = async () => {
        try {
            // if (title) {
            let res = await HenceForthApi.Auth.createdraftlisting({
                title: title,
                publicData: {
                    type: 3,
                    stepsCompleted: [
                        ...adSteps,
                        1
                    ]
                }
            })
            console.log(res);
            navigate(`/add-experience/step2/${res.data.id.uuid}`);
            // }
            // else {
            //     toast('🦄 Please fill the details', {
            //         position: "top-right",
            //         autoClose: 1000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //     });
            // }
        } catch (error) {
            console.log(error);
        }
    }

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
                                <button type="button"
                                    onClick={postStep1Data} className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"> Continue </button>
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