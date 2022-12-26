import { useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import CompletedSteps from "../Host Your Stalls/CompletedSteps"
import HenceForthApi from "../Utils/HenceForthApi"
import backArrow from '../Images/chevron-left-primary.svg'
import finishListing from '../Images/finish_your_listing.svg'
import preDefaultImg from '../Images/default_image.png'
import Spinner from "../Spinner/Spinner"
import { toast, ToastContainer } from "react-toastify"

type props = {
    setSteps: any
    steps: any
    setValue: (value: number) => void
}

const GuestsLastStep = (props: props) => {
    const { steps, setSteps, setValue } = props

    const navigate = useNavigate()
    const match = useMatch(`create-guest/last-step/:id`)

    let [coverPhoto, setCoverPhoto] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)
    const [userImg, serUserImg] = useState<string>('')
    const [title, setTitle] = useState<string>('')



    const allSteps = [
        {
            id: 1,
            step: "Title",
            url: `create-guest/step1/${match?.params.id}`,
            stepNumber: 1
        },
        {
            id: 2,
            step: "Rooms",
            url: `create-guest/step3/${match?.params.id}`,
            stepNumber: 3

        },
        {
            id: 3,
            step: "Location",
            url: `create-guest/step5/${match?.params.id}`,
            stepNumber: 5

        },
        {
            id: 4,
            step: "Amenities",
            url: `create-guest/step6/${match?.params.id}`,
            stepNumber: 6

        },
        {
            id: 5,
            step: "Photos",
            url: `create-guest/step7/${match?.params.id}`,
            stepNumber: 7

        },
        {
            id: 6,
            step: "Description",
            url: `create-guest/step8/${match?.params.id}`,
            stepNumber: 8

        },
        {
            id: 7,
            step: "Photos",
            url: `create-guest/step9/${match?.params.id}`,
            stepNumber: 9,
            checkImg: userImg
        },
        {
            id: 8,
            step: "Check in and Check out",
            url: `create-guest/checkin-and-checkout/${match?.params.id}`,
            stepNumber: 14

        },
        {
            id: 9,
            step: "Agreement",
            url: `create-guest/sucessfull-hosting/${match?.params.id}`,
            stepNumber: 15

        },
        {
            id: 10,
            step: "Calendar Availability",
            url: `create-guest/step11/${match?.params.id}`,
            stepNumber: 11

        },
        {
            id: 11,
            step: "Pricing",
            url: `create-guest/step12/${match?.params.id}`,
            stepNumber: 12

        },
        {
            id: 12,
            step: "Stripe Connect",
            url: `create-guest/step3/${match?.params.id}`,
            stepNumber: 13
        },
    ]

    const lastStep = () => {
        let checkSteps = [...new Set(steps) as any]
        if (checkSteps.length >= 11) {
            navigate(`/manage-listing/publish-listing/${match?.params.id}`)
        } else {
            toast.error('Please Complete All Steps')
        }
    }

    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setCoverPhoto(res?.data?.attributes?.publicData?.cover_photo?.url);
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);
            serUserImg(res?.data?.attributes?.publicData?.host_image);
            setTitle(res?.data?.attributes?.title)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listId()
        setValue(0)
        // eslint-disable-next-line 
    }, [])

    console.log(userImg);


    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <ToastContainer autoClose={1000} />
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "84%" }}>
                </div>
            </div>
            <div className="container">
                <div className="row mt-3 border-bottom pb-4">
                    <div className="col-md-5">
                        <h3 className="heading-large text-black line-height-space mb-3">Finish your listing to start earning..</h3>
                        <h6 className="text-lite mb-3">You can always edit your listing after you publish it.</h6>
                        {allSteps.map((e: any, index: any) =>
                            <CompletedSteps stepsArray={steps} proImg={e.checkImg} stepName={e.step} key={index} url={e.url} stepNumber={e.stepNumber} />
                        )}
                    </div>
                    <div className="col-md-7 text-center d-flex flex-column">
                        <div className="d-flex align-items-center flex-column justify-content-center flex-grow-1">
                            <div className="d-flex flex-column w-md-100">
                                <img alt="" src={finishListing} width="400px" className="d-none d-md-block" />
                                <div className="px-0 mt-4 flex-basis-auto">
                                    <div className="steps-preview d-flex align-items-center justify-content-between p-3 ml-md-5">
                                        <div className="text-left">
                                            <h6 className="font-medium single-line-ellipsis">{title}</h6>
                                            <Link className="pointer text-decoration-none" style={{ color: "#00A4B4" }} to={""}>Preview</Link>
                                        </div>
                                        <div className="prev-img">
                                            <img src={coverPhoto ? `${HenceForthApi.API_FILE_ROOT_MEDIUM}${coverPhoto}` : preDefaultImg} alt="Not Found" className="obj-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-6 ">
                            <div className="d-flex justify-content-between mt-5 border-top">
                                <div className="">
                                    <Link to="">
                                        <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                            <img alt="" src={backArrow} className="pr-1" /> Back
                                        </button>
                                    </Link>
                                </div>
                                <div className="">

                                    <button className="btn my-3 px-3 text-white" style={{ background: "rgb(0, 164, 180)" }} onClick={lastStep}
                                        disabled={loader}> {!loader ? "Next" : <Spinner />}
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
export default GuestsLastStep