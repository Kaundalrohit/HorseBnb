
import { useEffect, useState } from "react"
import { useMatch, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import HenceForthApi from "../Utils/HenceForthApi";

type props = {
    setSteps: any,
    steps: Array<number>
}

const GuestStep6 = (props: props) => {

    const { steps, setSteps } = props

    const [checked, setChecked] = useState<Array<string>>([])

    const navigate = useNavigate();
    const match = useMatch(`/create-guest/Step6/:id`)


    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);



        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listId()
        // eslint-disable-next-line 
    }, [])


    console.log(checked);

    const handleOffers = (e: any) => {
        const prev = checked
        const val = e.target.value
        const lastIndex = prev.indexOf(val)
        if (lastIndex !== -1) {
            prev.splice(lastIndex, 1)
        } else {
            prev.push(val)
        }
        setChecked([...prev])
    }

    const handleStep6 = async () => {
        let list = {
            id: match?.params.id,
            publicData: {
                amenities: checked,
                stepsCompleted: [...steps, 6]
            }
        }

        if (checked.length !== 0) {

            try {
                await HenceForthApi.Auth.Updatedlisting(list)
                navigate(`/create-guest/Step7/${match?.params.id}`)
            } catch (error) {
                console.log(error);

            }
        } else {
            toast('Select any  one offer', {
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


    const guestAmenities = [

        { "id": 1, amenities: "Private Room in House" },
        { "id": 2, amenities: "Private Suite" },
        { "id": 3, amenities: "Entire House" },
        { "id": 4, amenities: "Private Bathroom" },
        { "id": 5, amenities: "Shared BathRoom" },
        { "id": 6, amenities: "Private Kitchen" },
        { "id": 7, amenities: "Shared Kitchen" },
        { "id": 8, amenities: "Wifi" },
        { "id": 9, amenities: "Parking" },
        { "id": 10, amenities: "TV" },
        { "id": 11, amenities: "RV Parking/Trailer" },
    ]

    return (
        <>


            <div className="row mx-0">
                <ToastContainer />
                <div className="col-md-6 py-5 steps-frame-height overflow-y-auto overflow-scroll">
                    <div className="col-md-11 col-lg-8 px-0 mx-auto">
                        <h3 className="fw-600 heading-big">What amenities do you offer?</h3>

                        <p className="font-small-bold my-3">You will be able to add more amenities in your write up for your listing.
                        </p>
                        <div >


                            {/* <div className=""> */}

                            {guestAmenities.map((e: any, index: number) =>
                                <div className="checkbox-outerDiv">
                                    <label className="tickbox tickbox-sm mt-0 mb-4 text-default ng-star-inserted">
                                        <input type="checkbox" value={e.amenities} className="ng-valid ng-dirty ng-touched" onChange={(e: any) => handleOffers(e)} />
                                        <span className="ps-1">{e.amenities}</span>
                                    </label>
                                </div>
                            )}
                            {/* </div> */}
                            <div className="d-flex justify-content-between mt-5 border-top">
                                <button type="button" className="btn btn-transparent font-regular my-3 px-0" tabIndex={0} >
                                    <img src="" className="pr-1" alt="" /> Back
                                </button>

                                <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={handleStep6}>
                                    Next
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                        <img alt="" src="https://horsebnb.com/assets/img/guest_steps.png" width="350px" />
                    </div>
                </div>
            </div>

        </>
    )
}
export default GuestStep6