import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import HenceForthApi from '../../Utils/HenceForthApi';
import GetStarted from './GetStartedbtn';
type props = {
    setShowNav: any;
    saveExit: (value: number) => void
}
export default function UserNav({ setShowNav, saveExit }: props) {
    HenceForthApi.setToken(localStorage.getItem('token'))
    const location = useLocation()

    const [userData, setUserData] = useState<any>([])

    const logOut = () => {
        localStorage.removeItem("token")
        setShowNav(null)
    }

    const showData = async () => {
        let res = (await HenceForthApi.Auth.getdata()).data
        setUserData(res)
    }

    useEffect(() => {
        showData()
    }, [])

    const isImage = (url: string): boolean => {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }


    let userName = userData?.attributes?.profile?.displayName
    let userImg = userData?.attributes?.profile?.publicData?.profile_image

    return (
        <>
            <div className=" collapse navbar-collapse">
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                    {!location.pathname.startsWith('/h') && !location.pathname.startsWith('/c') && !location.pathname.startsWith('/create-stall/step3') && !location.pathname.startsWith('/ad')
                        ? < ul className="navbar-nav mb-2 mb-lg-0 navbar-nav ml-auto">
                            <li className="nav-item pt-2 mx-3 border-1 px-2 rounded-5 shadow ">
                                <Link to="/page/1" className="pointer search-btn col-lg-12 col-md-6 text-decoration-none text-dark">
                                    <span className="mr-3 ml-2 fs-14">Start your search</span>
                                    <i className="bi bi-search text-danger ms-2"></i>
                                </Link>

                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link fw-semibold" to="/host-stalls" >Host your Stalls</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link fw-semibold" to="/host-guests">Host Guests</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link fw-semibold" to="/host-an-experience">Host an Adventure</Link>
                            </li>
                            <li className="nav-item pt-2 me-3">
                                <i className="bi bi-chat-dots text-danger hello-git fw-bold"></i>
                            </li>
                            <div className="nav-item dropdown">
                                <button className="drotabIndex={0}pdown-toggle btn btn-profile" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="profile-img">
                                        <img className="obj-cover  ng-lazyloaded" src={userImg ? isImage(userImg)
                                            ?
                                            `${HenceForthApi.API_FILE_ROOT_SMALL}${userImg}`
                                            :
                                            userImg
                                            : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                                        } />
                                    </div>
                                    <span >{userName}</span>
                                </button>
                                <div className="dropdown_items dropdown-menu" x-placement="bottom-right" style={{ top: "0px", left: "0px", willChange: "transform", position: "absolute", transform: "translate(-28px, 47px)" }}>
                                    <Link to='/bookings' className='text-decoration-none'>
                                        <button type="button" className="dropdown-item fw-600" tabIndex={0}>Bookings</button>
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link to='/list-details/dashboard' className='text-decoration-none'>
                                        <button type="button" className="dropdown-item" tabIndex={0}>Dashboard</button>
                                    </Link>
                                    <Link to='/manage-listing' className='text-decoration-none'>
                                        <button type="button" className="dropdown-item" tabIndex={0}>Manage Listings </button>
                                    </Link>
                                    <Link to='/account' className='text-decoration-none'>
                                        <button type="button" className="dropdown-item" tabIndex={0}>Account</button>
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <button className="btn border-0" onClick={logOut}>Log Out</button>
                                </div>
                            </div>
                        </ul> : (
                            (
                                location.pathname.startsWith('/add-experience/step1') || location.pathname.endsWith('/step1') || location.pathname.match('/step1/') || location.pathname.startsWith('/create-stall/last-step') || location.pathname.startsWith('/add-experience/last-step') ? "" :
                                    location.pathname.startsWith('/c') || location.pathname.startsWith('/add-experience') || location.pathname.startsWith('/create-stall/step11/') ?
                                        <div>
                                            <button className='btn border-0 fw-bold' onClick={() => {
                                                saveExit(Math.random())
                                            }} style={{ color: "#00a4b4" }}>Save & Exit</button>
                                        </div> :
                                        <GetStarted />

                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}