import { useEffect } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"
import backArrow from '../Images/chevron-left-primary.svg'


type props = {
    steps: Array<number>,
    setSteps: any
}

const GuestStep11 = (props: props) => {

    const { steps, setSteps } = props


    const navigate = useNavigate()
    const match = useMatch(`/create-guest/Step11/:id`)

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


    const handleStep11 = async () => {


        try {
            navigate(`/create-guest/Step12/${match?.params.id}`)
        } catch (error) {

        }
    }

    return (

        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="div text-center">

                        <input type="date" name="" id="" />
                    </div>


                    <div className="d-flex justify-content-between border-top mt-auto">
                        <Link to={""}>   <button type="button" className="btn btn-transparent font-regular my-3 px-0">
                            <img src={backArrow} className="pr-1" alt="" /> Back </button></Link>

                        <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center" onClick={handleStep11} > Next </button>

                    </div>

                </div>

            </div>
        </>
    )
}
export default GuestStep11