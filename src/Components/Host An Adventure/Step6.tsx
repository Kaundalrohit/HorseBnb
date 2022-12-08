import { useState } from "react"
import { Link, useMatch } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type props = {
    adSteps: any
    setAdSteps: any;
}

const Step6 = (props: props) => {
    const { adSteps, setAdSteps } = props

    const match = useMatch('add-experience/step6/:id')
    HenceForthApi.setToken(localStorage.getItem('token'))
    const [grpSize, setGrpSize] = useState<any>()
    const postStep6Data = async () => {
        if (grpSize) {
            try {
                await HenceForthApi.Auth.Updatedlisting({
                    id: match?.params.id,
                    publicData: {
                        group_size: parseInt(grpSize),
                        stepsCompleted: [
                            ...adSteps,
                            6
                        ]
                    }
                })

            }
            catch (error) {
                console.log(error);

            }
        } else {
            toast('🦄 Please select group size', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    const list = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setAdSteps(res.data.attributes.publicData.stepsCompleted)
        }
        catch (error) {

        }
    }

    useState(() => {
        list()
    })
    return (
        <>
            <div className="row mx-0">
                <ToastContainer />

                <div className="col-md-6 py-5 steps-frame-height overflow-y-auto">
                    <div className="col-md-11 col-lg-8 px-0 mx-auto flex-column d-flex h-100">
                        <h4 className="heading-big text-black">Enter maximum group size </h4>
                        <p className="mb-4">Think about the group size that works best for your adventure. Should it be small and intimate? Is it fun with a large group? Please note that HorseBnB has a one-guest minimum, which means that if only one person books your adventure, you’ll still be expected to host.</p>
                        <input type="text" value={grpSize} onChange={(e: any) => {
                            setGrpSize(e.target.value.replace(/\D/g, ""))
                        }} maxLength={3} placeholder="Enter group size" className="form-control mb-4 ng-untouched ng-pristine ng-valid" ng-reflect-maxlength="3" ng-reflect-model="" />
                        <div className="d-flex justify-content-between border-top mt-auto">
                            <Link to="">
                                <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                    <img src="https://horsebnb.com/assets/img/chevron-left-primary.svg" alt="" className="pr-1" /> Back </button>
                            </Link>
                            <Link to={`/add-experience/step8/${match?.params.id}`}>
                                <button type="button"
                                    onClick={postStep6Data}
                                    className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center"> Next </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img src="https://horsebnb.com/assets/img/experience.png" alt="" width="350px" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Step6