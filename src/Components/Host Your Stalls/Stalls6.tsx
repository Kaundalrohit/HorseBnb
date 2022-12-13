import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import horseImg from '../Images/horse_image.png'
import backArrow from '../Images/chevron-left-primary.svg'
import HenceForthApi from "../Utils/HenceForthApi";
type props = {
    steps: any,
    setSteps: any
}

export default function Stalls6(props: props) {

    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem('token'));
    const match = useMatch(`/create-stall/step6/:id`)
    const navigate = useNavigate();

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

    const amenitiesOffers = [
        { option: "Climate Contolled Barn", id: 1 },
        { option: "Indoor Arena", id: 2 },
        { option: "Out Door Arena", id: 3 },
        { option: "Hot Walker", id: 4 },
        { option: "Round Pen", id: 5 },
        { option: "Trak Room", id: 6 },
        { option: "Trak Loader", id: 7 },
        { option: "Wash Rack", id: 8 },
        { option: "Hot Water", id: 9 },
        { option: "Lighted Arena", id: 10 },
        { option: "Trail Riding Accessible", id: 11 },
        { option: "Dog Friendly", id: 12 },
        { option: "Bathroom", id: 13 },
        { option: "Wifi", id: 14 },
        { option: "Shavings Included", id: 15 },
        { option: "Paddock", id: 16 },
        { option: "Box Stall", id: 17 },
        { option: "Box Stalls With Run", id: 18 },
        { option: "Stall Fans", id: 19 },
        { option: "Matted stalls", id: 20 },
        { option: "Private Pasture", id: 21 },
        { option: "Automatic Water Feeder", id: 22 },
        { option: "Feed Buckets", id: 23 },
        { option: "Water Buckets", id: 24 },
        { option: "Electric Fencing", id: 25 },
        { option: "Pasture", id: 26 },
        { option: "Turn Out", id: 27 },
        { option: "Mare Motel", id: 28 },
        { option: "Accepts Stallions", id: 29 },
    ]

    const [checked, setChecked] = useState<any>([]);

    const handleChecked = (e: any) => {
        let value = e.target.value
        let prev = checked;
        let itemIndex = prev.indexOf(value);
        if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
        } else {
            prev.push(value);
        }
        setChecked([...prev]);
    };


    const postStep6Data = async () => {
        if (checked.length === 0) return toast('🦄 Please Select at-least one option', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        const list = {
            id: match?.params.id,
            publicData: {
                stepsCompleted: [
                    ...steps, 6
                ],
                amenities: checked
            }

        }
        try {
            await HenceForthApi.Auth.Updatedlisting(list)
            navigate(`/create-stall/step7/${match?.params.id}`)
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <ToastContainer />
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "30%" }}>
                </div>
            </div>
            <div className="row mx-0 h-100">
                <div className="col-md-6 overflow-scroll ps-5 pt-2" style={{ height: '91vh' }}>
                    <h3 className="fw-600 heading-big mt-5">What amenities do you offer?</h3>
                    <p className="font-small-bold my-4 ">You will be able to add more amenities in your write up for your listing.</p>
                    {amenitiesOffers.map((e: any, index: any) => {
                        return (
                            <>
                                <div className="row">
                                    <label className="tickbox tickbox-sm mt-0 mb-4 text-default ng-star-inserted">
                                        <input type="checkbox" value={e.option} className="form-check-input me-2"
                                            onChange={(e: any) => handleChecked(e)}
                                        />
                                        {e.option}
                                        <span className="checkmark ">
                                        </span>
                                    </label>
                                </div>
                            </>
                        )
                    })}
                    <div className="d-flex justify-content-between mt-5 border-top">
                        <Link to="/create-stall/step5">
                            <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                <img src={backArrow} alt="" className="pr-1" /> Back
                            </button>
                        </Link>

                        <button className="btn my-3 px-3 text-white" onClick={postStep6Data} style={{ background: "rgb(0, 164, 180)" }}> Next
                        </button>

                    </div>
                </div>
                <div className="col-lg-6 text-center px-0">
                    <div className="h-100 d-flex py-5 align-items-center border-start justify-content-center">
                        <img src={horseImg} alt="" width="250px" />
                    </div>
                </div>
            </div>
        </>
    )
}