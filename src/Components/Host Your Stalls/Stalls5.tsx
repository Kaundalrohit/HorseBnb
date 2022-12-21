import { useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"
import horseImg from '../Images/horse_image.png'
import backArrow from '../Images/chevron-left-primary.svg'
import locationIcon from '../Images/near_me.svg'
import Spinner from "../Spinner/Spinner"
type props = {
    steps: any,
    setSteps: any
    value: number
}
export default function Stalls5(props: props) {
    const { steps, setSteps, value } = props
    const match = useMatch(`/create-stall/step5/:id`)
    const navigate = useNavigate()

    const [loader, setLoader] = useState<boolean>(false)


    useEffect(() => {
        const list = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
            } catch (error) {
                console.log(error);
            }
        }
        list()
        // eslint-disable-next-line 
    }, [])

    const uploadStep5Data = async (navigation: string) => {
        try {
            setLoader(true)
            await HenceForthApi.Auth.Updatedlisting({
                id: match?.params.id,
                publicData: {

                    stepsCompleted: [
                        ...steps, 5
                    ]
                }
            })
            setLoader(false)
            {
                (navigation === 'Next') ?
                    navigate(`/create-stall/step6/${match?.params.id}`)
                    :
                    navigate(`/create-stall/last-step/${match?.params.id}`)
            }

        } catch (error) {
            console.log(error);

        }
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            });
        }
    }
    useEffect(() => {
        if (value) {
            uploadStep5Data('Last')
        }
    }, [value])

    return (
        <>
            <section className="add_Location">
                <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "20%" }}>
                    </div>
                </div>
                <div className="row mx-0 h-100">
                    <div className="col-md-6 py-5 px-0 outer_location overflow-scroll" style={{ height: '91vh' }}>
                        <div className=" ">
                            <div className="col-md-11 col-lg-8 px-0 mx-auto text-start">
                                <h3 className="fw-600 heading-big">Where is your place located?</h3>
                                <div className="">
                                    <p className="font-small-bold my-3">Please input your exact address. Guests will not be able to see your exact address until they have made a booking.</p>
                                    <button className="btn btn-sky-outline-lg border-0 my-3 mb-4 position-relative d-flex align-items-center justify-content-center" style={{ border: "1px solid rgb(0, 164, 180)" }} onClick={getLocation}>
                                        <img src={locationIcon} alt="" className="img-fluid" />
                                        <span style={{ color: "#00a4b4" }} className="fw-bold ps-2"> Use current location </span>
                                    </button>

                                </div>
                                <div className="d-flex justify-content-between mt-5 mb-0 border-top">
                                    <Link to="/create-stall/step3">
                                        <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                            <img src={backArrow} className="pr-1" alt="" /> Back
                                        </button>
                                    </Link>
                                    <button className="btn my-3 px-3 text-white" onClick={() => uploadStep5Data('Next')} style={{ background: "rgb(0, 164, 180)" }}
                                        disabled={loader}
                                    > {!loader ? "Next" : <Spinner />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center px-0">
                        <div className="h-100 d-flex py-5 align-items-center border-start justify-content-center">
                            <img src={horseImg} alt="" width="250px" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
