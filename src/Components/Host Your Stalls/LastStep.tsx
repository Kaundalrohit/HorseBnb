import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import HenceForthApi from "../Utils/HenceForthApi";
import CompletedSteps from "./CompletedSteps";
import backArrow from '../Images/chevron-left-primary.svg'
import finishListing from '../Images/chevron-left-primary.svg'
import preDefaultImg from '../Images/default_image.png'
import { toast, ToastContainer } from "react-toastify";

type props = {
    setValue: (value: number) => void
}
export default function LastStep({ setValue }: props) {
    const [step, setStep] = useState<any>([])

    const match = useMatch('/create-stall/last-step/:id')
    HenceForthApi.setToken(localStorage.getItem('token'));
    const navigate = useNavigate()

    const [coverImg, setCoverImg] = useState<any>()
    const [proImg, setProImg] = useState<string>('')
    const [title, setTitle] = useState('')

    const getData = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setCoverImg(res.data.attributes.publicData.cover_photo);
            setStep(res.data.attributes.publicData.stepsCompleted)
            setProImg(res?.data?.attributes?.publicData?.host_image)
            setTitle(res?.data?.attributes?.title)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
        setValue(0)
    }, [])


    const allSteps = [
        {
            id: 1,
            step: "Title",
            url: `create-stall/step1/${match?.params.id}`,
            stepNumber: 1
        },
        {
            id: 2,
            step: "Stalls",
            url: `create-stall/step3/${match?.params.id}`,
            stepNumber: 3

        },
        {
            id: 3,
            step: "Location",
            url: `create-stall/step5/${match?.params.id}`,
            stepNumber: 5

        },
        {
            id: 4,
            step: "Amenities",
            url: `create-stall/step6/${match?.params.id}`,
            stepNumber: 6

        },
        {
            id: 5,
            step: "Photos",
            url: `create-stall/step7/${match?.params.id}`,
            stepNumber: 7

        },
        {
            id: 6,
            step: "Description",
            url: `create-stall/step8/${match?.params.id}`,
            stepNumber: 8

        },
        {
            id: 7,
            step: "Photo",
            url: `create-stall/step9/${match?.params.id}`,
            stepNumber: 9,
            proImg: proImg

        },
        {
            id: 8,
            step: "Check in and Check out",
            url: `create-stall/checkin-and-checkout/${match?.params.id}`,
            stepNumber: 10,

        },
        {
            id: 9,
            step: "Agreement",
            url: `create-stall/sucessfull-hosting/${match?.params.id}`,
            stepNumber: 15

        },
        {
            id: 10,
            step: "Calendar Availability",
            url: `create-stall/step11/${match?.params.id}`,
            stepNumber: 11

        },
        {
            id: 11,
            step: "Pricing",
            url: `create-stall/step12/${match?.params.id}`,
            stepNumber: 12

        },
        {
            id: 12,
            step: "Stripe Connect",
            url: `create-stall/step13/${match?.params.id}`,
            stepNumber: 13
        },
    ]

    const completeLastStep = () => {
        let steps = [...new Set(step) as any];

        // if (steps.length >=10 ) {
        //     alert('no')
        // }
        // else {
        //     alert('yes')
        // }

        // const array = [1, 3, 5, 6, 7, 8, 9, 10, 15, 11, 12]
        // if (steps.sort().join(',') === array.sort().join(',')) {
        //     alert('Yes')
        // } else {
        //     alert('No')
        // }

        if (steps.length === 11) {
            navigate(`/manage-listing/publish-listing/${match?.params.id}`)
        } else {
            toast.error('Please Complete All Steps')
        }

    }

    return (
        <>
            <div className="container">
                <ToastContainer autoClose={1000} />
                <div className="row mt-3 border-bottom pb-4">
                    <div className="col-md-5">
                        <h3 className="heading-large text-black line-height-space mb-3">Finish your listing to start earning..</h3>
                        <h6 className="text-lite mb-3">You can always edit your listing after you publish it.</h6>
                        {allSteps.map((e: any, index: any) =>
                            <CompletedSteps stepsArray={step} proImg={e.proImg} stepName={e.step} key={index} url={e.url} stepNumber={e.stepNumber} />
                        )}
                    </div>
                    <div className="col-md-7 text-center d-flex flex-column">
                        <div className="d-flex align-items-center flex-column justify-content-center flex-grow-1">
                            <div className="d-flex flex-column w-md-100">
                                <img src={finishListing} alt="" width="400px" className="d-none d-md-block" />
                                <div className="px-0 mt-4 flex-basis-auto">
                                    <div className="steps-preview d-flex align-items-center justify-content-between p-3 ml-md-5">
                                        <div className="text-left">
                                            <h6 className="font-medium single-line-ellipsis">{title}</h6>
                                            <Link className="pointer text-decoration-none" style={{ color: "#00a4b4" }} to={""}>Preview</Link>
                                        </div>
                                        <div className="prev-img">
                                            <img className="obj-cover  ng-star-inserted ng-lazyloaded" alt="" src={coverImg?.url ? `${HenceForthApi.API_FILE_ROOT_MEDIUM}${coverImg?.url}` : preDefaultImg} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-12 ">
                            <div className="d-flex justify-content-between mt-5 border-top">
                                <div className="">
                                    <Link to="/create-stall/step13">
                                        <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                            <img src={backArrow}
                                                alt=""
                                                className="pr-1" /> Back
                                        </button>
                                    </Link>
                                </div>
                                <div className="">
                                    <button className="btn my-3 px-3 text-white" style={{ background: "rgb(0, 164, 180)" }}
                                        onClick={completeLastStep}
                                    > Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}