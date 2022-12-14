import { useEffect, useState } from "react"
import { useMatch, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import HenceForthApi from "../Utils/HenceForthApi"
import backArrow from '../Images/chevron-left-primary.svg'
import guestSteps from '../Images/guest_steps.png'



type props = {
    setSteps: any,
    steps: Array<number>
}

const GuestStep8 = (props: props) => {

    const { steps, setSteps } = props


    const [state, setState] = useState({
        description: "",
        extra_detail: "",
        userImg: ""

    })

    const handleText = (e: any) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })


    }

    const navigate = useNavigate()
    const match = useMatch(`/create-guest/Step8/:id`)

    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params?.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);
            setState({
                ...state,
                userImg: res?.data?.attributes?.publicData?.host_image
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // getStartedShow()
        listId()
        // eslint-disable-next-line 
    }, [])


    const handleStep8 = async () => {

        const list = {
            id: match?.params.id,
            description: state.description,
            publicData: {
                extra_detail: state.extra_detail,
                stepsCompleted: [...steps, 8]
            }
        }
        if (state.description && state.extra_detail) {
            try {
                await HenceForthApi.Auth.Updatedlisting(list)
                {
                    !state.userImg ? navigate(`/create-guest/step9/${match?.params.id}`) : navigate(`/create-guest/checkin-and-checkout/${match?.params.id}`)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast('Enter the text', {
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






    return (
        <>
            <div className="row mx-0">
                <ToastContainer />
                <div className="col-md-6 py-5 steps-frame-height overflow-y-auto">
                    <div className="col-md-11 col-lg-8 px-md-0 mx-auto">
                        <h3 className="heading-big">Describe your place to guests</h3>
                        <p className="font-small-bold mt-3 mb-0">Write a quick summary of your place. You can highlight what is special about your space, your business and how you will interact with guests.</p>
                        <p className="font-small-bold mb-3">Do not include business name or contact information.</p>
                        <div >
                            <form className="ng-dirty ng-invalid ng-touched">
                                <textarea rows={5} cols={5} placeholder="Type here..." maxLength={1000} value={state.description} name="description" onChange={handleText} className="form-control ng-dirty ng-invalid ng-touched"  >
                                </textarea>
                                {/* <small  className="d-block text-right float-right total-caracteres">0/1000</small> */}
                                <div className="invalid-feedback d-block">
                                </div>
                                <div className="mt-5">
                                    <h4 className="heading-big">Want to add more info?</h4>
                                    <p className="mb-4">Use the additional fields below to share more details</p>
                                    <textarea rows={5} cols={5} name="extra_detail" onChange={handleText} value={state.extra_detail} placeholder="Type here..." className="form-control ng-untouched ng-pristine ng-valid" >
                                    </textarea>
                                </div>
                                <div className="d-flex justify-content-between border-top mt-5">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" tabIndex={0} >
                                        <img alt="" src={backArrow} className="pr-1" />
                                        Back
                                    </button>

                                    <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={handleStep8} > Next </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img alt="" src={guestSteps} width="350px" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuestStep8

