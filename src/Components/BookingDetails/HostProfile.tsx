import { useMatch } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"

const HostProfile = () => {
    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch(`/profile/:id`)
    let id = match?.params?.id

    return (
        <>
            <div className="">
                {id}
            </div>
        </>
    )

}
export default HostProfile