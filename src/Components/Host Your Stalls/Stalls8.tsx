import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import horseImg from '../Images/horse_image.png'
import backArrow from '../Images/chevron-left-primary.svg'
type props = {
    steps: any,
    setSteps: any
}

export default function Stalls8(props: props) {
    const { steps, setSteps } = props
    HenceForthApi.setToken(localStorage.getItem('token'));
    const match = useMatch(`/create-stall/step8/:id`)
    const navigate = useNavigate()

    const [userImg, setUserImg] = useState<string>('')

    const [checked, setChecked] = useState<string | number | readonly string[] | undefined>()

    useEffect(() => {
        const list = async () => {
            try {
                let res = (await HenceForthApi.Auth.Listid(match?.params.id)).data
                setSteps(res?.attributes?.publicData?.stepsCompleted)
                setUserImg(res?.attributes?.publicData?.host_image)
            } catch (error) {
                console.log(error);
            }
        }
        list()
        // eslint-disable-next-line 
    }, [])

    const [state, setstate] = useState({
        description: "",
        extra_detail: "",
    })
    const updateState = (e: any) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const postStep8Data = async () => {
        if (state.description && state.extra_detail) {
            try {
                (await HenceForthApi.Auth.Updatedlisting({
                    description: state.description,
                    id: match?.params.id,
                    publicData: {
                        extra_detail: state.extra_detail,
                        is_accomodation_offered: checked,
                        stepsCompleted: [
                            ...steps, 8,
                        ]
                    }
                }))

                {
                    !userImg ? navigate(`/create-stall/step9/${match?.params.id}`) :
                        navigate(`/create-stall/checkin-and-checkout/${match?.params.id}`)
                }
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
                        <h3 className="heading-big">Describe your place to guests</h3>
                        <p className="font-small-bold mb-0">Write a quick summary of your place. You can highlight what is special about your space, your business and how you will interact with guests.</p>
                        <p className="font-small-bold mb-4">Do not include business name or contact information.</p>
                        <div >
                            <textarea rows={5} cols={5} placeholder="Type here..." maxLength={1000} className="form-control " value={state.description} name="description" onChange={(e: any) => updateState(e)}  ></textarea>
                            <small className="d-block text-right float-right total-caracteres"></small>
                            <div className="invalid-feedback d-block">
                            </div>
                            <div className="mt-5">
                                <h4 className="heading-big">Want to add more info?</h4>
                                <p className="mb-4">Use the additional fields below to share more details</p>
                                <textarea rows={5} cols={5} placeholder="Type here..." className="form-control ng-untouched ng-pristine ng-valid" value={state.extra_detail} name="extra_detail" onChange={(e: any) => updateState(e)} >
                                </textarea>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="is_accomodation_offered" className="tickbox tickbox-sm text-default" > I also offer guest accommodations <input type="checkbox"
                                    value={checked} onChange={(e: any) => {
                                        setChecked(e.target.checked)
                                    }} id="is_accomodation_offered" name="is_accomodation_offered" className="ng-untouched ng-pristine ng-valid" />
                                    <span className="checkmark skyblue"></span>
                                </label>
                            </div>
                            <div className="d-flex justify-content-between border-top mt-5">
                                <Link to="/create-stall/step7">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                        <img src={backArrow}
                                            alt="" className="pr-1" /> Back
                                    </button>
                                </Link>
                                <button className="btn my-3 px-3 text-white" onClick={postStep8Data} style={{ background: "rgb(0, 164, 180)" }}> Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img src={horseImg} width="250px" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}