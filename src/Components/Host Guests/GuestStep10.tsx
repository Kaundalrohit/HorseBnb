import { useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import HenceForthApi from "../Utils/HenceForthApi"


type props = {
    setSteps: any,
    steps: Array<number>
}


const GuestStep10 = (props: props) => {
    const { steps, setSteps } = props
    const [check, setCheck] = useState()


    const navigate = useNavigate()
    const match = useMatch(`/create-guest/sucessfull-hosting/:id`)

    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // getStartedShow()
        listId()
        // eslint-disable-next-line 
    }, [])

    const setAvailability = async () => {

        const list = {
            id: match?.params.id,
            publicData: {
                gotIt: check,
                stepsCompleted: [...steps, 14]
            }
        }
        if (check === true) {

            try {
                await HenceForthApi.Auth.Updatedlisting(list)
                navigate(`/create-guest/Step11/${match?.params.id}`)
            } catch (error) {
                console.log(error);
            }
        } else {
            toast('agree the condition to continue', {
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
    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "56%" }}>
                </div>
            </div>
            <div className="row mx-0">
                <ToastContainer />
                <div className="col-md-6 py-5 frame-height overflow-y-auto">
                    <div className="col-md-8 px-md-0 mx-auto d-flex flex-column h-100">
                        <h3 className="heading-big mb-4">Successful hosting starts with an accurate calendar</h3>
                        <p className="font-small-bold my-3">Guests will be able to book your listing instantly. By keeping your calendar up to date you will only get bookings when you are able to host. If you make multiple cancellations it could affect your listings ranking and create negative reviews as it causes problems for travellers.</p>
                        <form className="ng-valid ng-dirty ng-touched">
                            <input type="checkbox" id="calendar_up_to_date" value={check} onChange={(e: any) => setCheck(e.target.checked)} name="got_it" className="ng-valid ng-dirty ng-touched" required />
                            <label htmlFor="calendar_up_to_date" className="tickbox tickbox-sm mt-0 mb-4 text-default"> Got it! I'll keep my calendar up to date.

                                <span className="checkmark skyblue"></span>
                            </label>
                        </form>
                        <div className="d-flex justify-content-between border-top mt-auto">
                            <Link to={"/create-stall/Timmings"}>   <button type="button" className="btn btn-transparent font-regular my-3 px-0">
                                <img src="../../.././../assets/img/chevron-left-primary.svg" className="pr-1" alt="" /> Back </button></Link>


                            <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={setAvailability} > Next </button>

                        </div>
                    </div>
                </div>
                <div className="col-lg-6 text-center px-0">
                    <div className="h-100 d-flex py-5 align-items-center border-start justify-content-center">
                        <img src="https://horsebnb.com/assets/img/create-stalls/horse_image.png" alt="" width="250px" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default GuestStep10

