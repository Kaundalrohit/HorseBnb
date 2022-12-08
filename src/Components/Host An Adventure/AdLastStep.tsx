import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import CompletedSteps from "../Host Your Stalls/CompletedSteps";
import HenceForthApi from "../Utils/HenceForthApi";
type props = {
    adSteps: any
    setAdSteps: any;
}

const AdLastStep = (props: props) => {
    const { adSteps, setAdSteps } = props

    const match = useMatch('/add-experience/last-step/:id')
    const [step, setStep] = useState<any>([])

    HenceForthApi.setToken(localStorage.getItem('token'));

    const [coverImg, setCoverImg] = useState<any>()


    const allSteps = [
        {
            id: 1,
            step: "Title",
            url: `add-experience/step1`,
            stepNumber: 1
        },
        {
            id: 2,
            step: "Location & Your Idea",
            url: `add-experience/step2/${match?.params.id}`,
            stepNumber: 2

        },
        {
            id: 3,
            step: "Description",
            url: `add-experience/step4/${match?.params.id}`,
            stepNumber: 4

        },
        {
            id: 4,
            step: "Photos",
            url: `add-experience/step5/${match?.params.id}`,
            stepNumber: 5

        },
        {
            id: 5,
            step: "Booking Settings",
            url: `add-experience/step6/${match?.params.id}`,
            stepNumber: 6

        },
        {
            id: 6,
            step: "Pricing",
            url: `add-experience/step8/${match?.params.id}`,
            stepNumber: 8

        },
        {
            id: 7,
            step: "Stripe Connect",
            url: `add-experience/step9/${match?.params.id}`,
            stepNumber: 9

        },

    ]

    const list = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setAdSteps(res.data.arrtibutes.publicData.stepsCompleted)
        }
        catch (error) {

        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setCoverImg(res.data.attributes.publicData.cover_photo);
                setStep(res.data.attributes.publicData.stepsCompleted)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
        list()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row mt-3 border-bottom pb-4">
                    <div className="col-md-5">
                        <h3 className="heading-large text-black line-height-space mb-3">Finish your listing to start earning..</h3>
                        <h6 className="text-lite mb-3">You can always edit your listing after you publish it.</h6>
                        {allSteps.map((e: any, index: any) =>
                            <CompletedSteps stepsArray={step} stepName={e.step} key={index} url={e.url} stepNumber={e.stepNumber} />
                        )}
                    </div>
                    <div className="col-md-7 text-center d-flex flex-column">
                        <div className="d-flex align-items-center flex-column justify-content-center flex-grow-1">
                            <div className="d-flex flex-column w-md-100">
                                <img src="https://horsebnb.com/assets/img/create-stalls/finish_your_listing.svg" alt="" width="400px" className="d-none d-md-block" />
                                <div className="px-0 mt-4 flex-basis-auto">
                                    <div className="steps-preview d-flex align-items-center justify-content-between p-3 ml-md-5">
                                        <div className="text-left">
                                            <h6 className="font-medium single-line-ellipsis">oo</h6>
                                            <Link className="pointer text-decoration-none" style={{ color: "#00a4b4" }} to={""}>Preview</Link>
                                        </div>
                                        <div className="prev-img">
                                            <img className="obj-cover  ng-star-inserted ng-lazyloaded" alt="" src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${coverImg?.url} `} />
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
                                    <Link to="">
                                        <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                            <img src="https://horsebnb.com/assets/img/chevron-left-primary.svg"
                                                alt=""
                                                className="pr-1" /> Back
                                        </button>
                                    </Link>
                                </div>
                                <div className="">
                                    <Link to={`/manage-listing/publish-listing/${match?.params.id}`}>
                                        <button className="btn my-3 px-3 text-white" style={{ background: "rgb(0, 164, 180)" }}> Next
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdLastStep