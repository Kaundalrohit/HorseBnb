import { useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"
import backArrow from '../Images/chevron-left-primary.svg'
import bulbImg from '../Images/lightbulb.svg'



type props = {
    steps: Array<number>,
    setSteps: any
}

const GuestStep11 = (props: props) => {

    const { steps, setSteps } = props

    const navigate = useNavigate()
    const match = useMatch(`/create-guest/Step11/:id`)

    const [loader, setLoader] = useState<boolean>(false)


    const handleStep11 = async () => {
        try {
            setLoader(true)
            navigate(`/create-guest/Step12/${match?.params.id}`)
            setLoader(false)
        } catch (error) {

        }
    }

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

    return (

        <>
            <div className="row">
                <div className="col-md-6" >
                    <div className="text-center mt-5" style={{ height: "30vh" }}>

                        <input type="date" name="" id="" />
                    </div>


                    <div className="d-flex justify-content-between border-top mt-auto">
                        <Link to={""}>   <button type="button" className="btn btn-transparent font-regular my-3 px-0">
                            <img src={backArrow} className="pr-1" alt="" /> Back </button></Link>

                        <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={handleStep11} > {!loader ? "Next" : "Loading.."} </button>

                    </div>

                </div>
                <div className="col-md-6 px-md-0 d-none d-md-block">
                    <div className="py-5 h-100 d-flex align-items-start px-md-5 bg-light justify-content-start">
                        <div className="border col-md-8 px-4 py-4 mb-4 bg-white">
                            <img src={bulbImg} height="32px" className="mb-4" />
                            <p className="font-small">Important! Your calendar default set up is to show as available for the next 90 days. If you are unable to host any of those days please make sure to block off those days on your calendar so you don’t get any unwanted bookings.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default GuestStep11