import { useLocation, Link } from 'react-router-dom'
type props = {
    setShowNav: any;
}
export default function UserNav({ setShowNav }: props) {
    const location = useLocation()
    const logOut = () => {
        localStorage.removeItem("token")
        setShowNav(null)
    }
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
                            <li className="nav-item pt-2 mx-3">
                                <i className="bi bi-chat-dots text-danger fw-bold"></i>
                            </li>
                            <div className="dropdown ms-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown button
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                    <li><button className="btn border-0" onClick={logOut}>Log Out</button></li>
                                </ul>
                            </div>
                        </ul> : (
                            location.pathname.startsWith('/create-stall/step1') ? "" :
                                (
                                    location.pathname.startsWith('/c') || location.pathname.startsWith('/add-experience') ?
                                        <div>
                                            <button className='btn border-0 fw-bold' style={{ color: "#00a4b4" }}>Save & Exit</button>
                                        </div> :
                                        <Link to="create-stall/step1">
                                            <button className='btn text-white fw-bold' style={{ background: "#00a4b4" }}>Get Started</button>
                                        </Link>

                                )
                        )
                    }
                </div>
            </div>
        </>
    )
}