import { Link } from "react-router-dom"
import "./Footer.css"
import Logo from '../../Images/Logo.png'
import appStore from '../../Images/app-store.png'
import playstore from '../../Images/google-play.png'

export default function Footer() {
    return (
        <>
            <div className="bg-black"><div className="container">
                <footer className="footer"><div className="row">
                    <div className="col-md-3 ">
                        <div className="text-white" >
                            <img src={Logo} alt="" />
                        </div>
                        <p className="font-mini mb-0 m-3">© 2022 HorseBnB, Inc.</p>
                    </div>
                    <div className="col-md-3"><ul className="list-unstyled mb-0">
                        <Link to="/about-us" className="text-decoration-none text-white">
                            <li className=" mb-2" >
                                <span className="cursor-pointer mb-2"  >About Us</span>
                            </li>
                        </Link>
                        <li className=" mb-2" >
                            <span className="cursor-pointer mb-2"  >Contact Us</span>
                        </li>
                        <li className=" mb-2" >
                            <span className="cursor-pointer mb-2"  >Terms &amp; Conditions</span>
                        </li>
                        <li className=" mb-2" >
                            <span className="cursor-pointer mb-2"  >Privacy Policy</span>
                        </li>
                    </ul>
                    </div>
                    <div className="col-md-3"><ul className="list-unstyled">
                        <li className=" mb-2" >
                            <a href="https://facebook.com/horsebnb1" rel="noreferrer" target="_blank" className="text-decoration-none text-white">

                                <i className="bi bi-facebook me-1"></i> Facebook
                            </a>
                        </li>
                        <li className=" mb-2" >
                            <a href="https://instagram.com/horse.bnb" rel="noreferrer" target="_blank" className="text-decoration-none text-white">
                                <i className="bi bi-instagram me-1"></i>   Instagram </a>
                        </li>
                        <li className=" mb-2">

                            <span className="cursor-pointer pr-2" >
                                <i className="bi bi-question-circle me-2"></i>Faq</span>
                        </li>
                    </ul>
                    </div>
                    <div className="col-md-3"><ul className="list-unstyled">
                        <li >
                            <a href="https://apps.apple.com/in/app/horsebnb/id1539865862" rel="noreferrer" target="_blank">
                                <img src={appStore} alt="" />
                            </a>
                        </li>
                        <li className="mt-3" >
                            <a href="https://play.google.com/store/apps/details?id=com.henceforth.horsebnb" rel="noreferrer" target="_blank">
                                <img src={playstore} alt="" />
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
                </footer>
            </div>
            </div >
        </>
    )
}