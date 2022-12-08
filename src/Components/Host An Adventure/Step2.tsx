import { useState } from "react";
import { Link, useMatch, useNavigate, useSearchParams } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi";
type props = {
    adSteps: any
    setAdSteps: any;
}

const Step2 = (props: props) => {
    const { adSteps, setAdSteps } = props
    HenceForthApi.setToken(localStorage.getItem('token'))
    const match = useMatch('/add-experience/step2/:id');
    const navigate = useNavigate()

    const list = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setAdSteps(res?.data?.attributes?.publicData?.stepsCompleted)
        }
        catch (error) {

        }
    }

    useState(() => {
        list()
    })

    const postStep2Data = async () => {
        try {
            let res = await HenceForthApi.Auth.Updatedlisting({
                id: match?.params.id,
                publicData: {
                    stepsCompleted: [
                        ...adSteps, 2
                    ]
                }
            })
            console.log(res);
            navigate(`/add-experience/step4/${match?.params.id}`)

        } catch (error) {
            console.log(error);

        }
    }
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
                                    <button className="btn btn-sky-outline-lg my-3 mb-4 position-relative d-flex align-items-center justify-content-center" style={{ border: "1px solid rgb(0, 164, 180)" }}>
                                        <img src="../../Horsebnb Assets/near_me.svg" alt="" className="img-fluid" />Use current location </button>

                                </div>
                                <div className="d-flex justify-content-between mt-5 mb-0 border-top">
                                    <Link to="">
                                        <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                            <img src="https://horsebnb.com/assets/img/chevron-left-primary.svg" className="pr-1" alt="" /> Back
                                        </button>
                                    </Link>

                                    <button className="btn my-3 px-3 text-white"
                                        onClick={postStep2Data}
                                        style={{ background: "rgb(0, 164, 180)" }}> Next
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center px-0">
                        <div className="h-100 d-flex py-5 align-items-center border-start justify-content-center">
                            <img src="https://horsebnb.com/assets/img/experience.png" alt="" width="250px" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Step2