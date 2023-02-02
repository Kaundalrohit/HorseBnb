import { useNavigate, useLocation } from "react-router-dom"
const GetStarted = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleNavigate = () => {
        if (location.pathname.startsWith('/host-stalls')) {
            navigate("create-stall/step1");
        }
        else if (location.pathname.startsWith('/host-guests')) {
            navigate("create-guest/step1")
        }
        else {
            navigate("add-experience/step1")
        }
    }
    return (
        <>
            <button className='btn text-white fw-bold' style={{ background: "#00a4b4" }} onClick={handleNavigate}>Get Started</button>
        </>
    )
}
export default GetStarted