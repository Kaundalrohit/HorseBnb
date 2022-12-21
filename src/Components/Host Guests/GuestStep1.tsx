import { useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import HenceForthApi from "../Utils/HenceForthApi"
import guestMainImg from '../Images/guest_main.png'
import Spinner from "../Spinner/Spinner"

type props = {
    steps: any,
    setSteps: any
}
const GuestStep1 = (props: props) => {
    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem('token'))
    const navigate = useNavigate()
    const match = useMatch(`/create-guest/step1/:id`)
    let id = match?.params.id

    const [title, setTitle] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)


    let step1 = async () => {
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
                navigate(`/create-guest/step3/${res.data.id.uuid
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
                navigate(`/create-guest/step3/${res.data.id.uuid
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
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
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
            <div className="container frame-height">
                <ToastContainer />
                <div className="row py-5">
                    <div className="col-md-6 col-lg-4">
                        <h4 className="heading-large mb-3">Hi, Bharat let's get started listing your space.</h4>
                        <p className="fw-600 mb-1 text-dim">STEP 1</p>
                        <div >
                            <h4 className="heading-big mt-4">Create a title for your listing?</h4>
                            <div className="my-2">
                                <p className="text-danger">Please note if you offer multiple services, you must create an individual listing per category. </p>
                            </div>
                            <p >Catch guest's attention with a listing title that highlights what makes your place special. This can not be your business name.</p>
                            <input type="text" placeholder="Enter title" className="form-control mt-4 firstLetterCapital ng-dirty ng-valid ng-touched" value={title} onChange={(e: any) => setTitle(e.target.value)} />
                            <button type="button" onClick={() => step1()} className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"
                                disabled={loader}>
                                {!loader ? "Continue" : <Spinner />}
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-8 text-center d-none d-md-flex flex-column align-items-center justify-content-center">
                        <img src={guestMainImg} width="500px" className="ipad-img" />
                    </div>
                </div>
            </div>

        </>
    )
}
export default GuestStep1