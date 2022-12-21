import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import selfieImg from '../Images/taking_selfie.svg'
import backArrow from '../Images/chevron-left-primary.svg'
import defaultUserImg from '../Images/defaultUserImg.jpg'

type props = {
    steps: any,
    setSteps: any
    value: number
}

export default function Stalls9(props: props) {
    const { steps, setSteps, value } = props
    const [userImg, setUserImg] = useState<string>('')
    const [loader, setLoader] = useState<boolean>(false)

    HenceForthApi.setToken(localStorage.getItem("token"))
    const navigate = useNavigate()
    const match = useMatch('/create-stall/step9/:id')
    // const navigate = useNavigate()

    const list = async () => {
        try {
            let res = (await HenceForthApi.Auth.Listid(match?.params.id)).data
            setSteps(res?.attributes?.publicData?.stepsCompleted)
            setUserImg(res?.attributes?.publicData?.host_image)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e: any) => {
        let file = e.target.files[0]
        try {
            setLoader(true)
            let res = (await HenceForthApi.Auth.Uploadimage("file", file))
            await uploadImg(res.filename)
            await list()
            setLoader(false)
        } catch (error) {
            console.log(error);

        }

    }

    const uploadImg = async (url: string) => {
        const list = {
            publicData: {
                image: url,
                // stepsCompleted: [...steps, 9,]
            }
        }
        try {
            setLoader(true)
            let res = (await HenceForthApi.Auth.updateUserProfile(list))
            setLoader(false)
        } catch (error) {
            console.log(error);

        }
    }

    const nextPage = async (navigation: string) => {
        const list = {
            publicData: {
                host_image: userImg,
                stepsCompleted: [...steps, 9,]
            }
        }
        let res = await HenceForthApi.Auth.Updatedlisting(list)
        console.log(res);

        navigation === 'Next' ? navigate(`/create-stall/checkin-and-checkout/${match?.params.id}`) :
            navigate(`/create-stall/last-step/${match?.params.id}`)

    }

    useEffect(() => {
        list()
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        (value && nextPage('Last'))
    }, [value])

    return (
        <>
            <div >
                <ToastContainer />
                <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "60%" }}>
                    </div>
                </div>
                <div className="row mx-0 h-100">
                    <div className="col-md-6 py-5 px-md-0 frame-height overflow-y-auto">
                        <div className="col-lg-8 col-md-11 px-md-0 mx-auto">
                            <h3 className="heading-big pb-4">Profile picture</h3>
                            {loader && <p>Feching Image....</p>}
                            <div >

                                <div className="d-flex mb-3 align-items-start">
                                    <div className="h-101 mr-4 position-relative">

                                        <img className="rounded-circle img-fluid profile-img" alt=''
                                            src={userImg ? `${HenceForthApi.API_FILE_ROOT_SMALL}${userImg}` : defaultUserImg}
                                        />
                                    </div>

                                    <div className="d-flex flex-column align-items-start">
                                        <p className="mt-1">Add your photo so other users can see who they are communicating with</p>
                                        <label htmlFor="file">
                                            <span className="h3 ms-1 btn-primary p-2 rounded-2">{!userImg ? "Upload Photo" : "Change Photo"}</span>
                                        </label>
                                        <input type="file" id="file" onChange={handleSubmit} className="d-none" />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between border-top mt-5">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                        <img src={backArrow} alt='' className="pr-1" /> Back </button>
                                    <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={() => nextPage('Next')}> {!loader ? "Next" : "Loading....."} </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                        <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                            <img src={selfieImg} alt="" width="250px" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}