import { Link } from "react-router-dom"
import stripeBtn from '../Images/connect_stripe_buttin.png'
import paymentIcon from '../Images/line.svg'


const Payments = () => {
    return (
        <>
            <div className="container mt-4 mb-5 min-frame-height">
                <nav aria-label="breadcrumb mb-4"><ol className="breadcrumb pl-0">
                    <li className="breadcrumb-item">
                        <Link to="/account" className="text-decoration-none text-black">Account</Link>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active d-flex align-items-center justify-content-center"> Payments</li>
                </ol>
                </nav>
                <div className="row justify-content-md-between">
                    <div className="col-md-7 col-lg-7 d-flex flex-wrap">
                        <div className="col-md-10 col-lg-6 px-0 pl-lg-0 pr-lg-3 mb-5 mb-lg-0">
                        </div>
                        <div className="col-md-12 pl-0">
                            <div >
                                <h2 className="heading-big mb-5 text-black">Payments</h2>
                                <h3 className="font-22-ebold my-2 text-black">Payout methods</h3>
                                <p className="mb-5"> Please connect your account with Stripe. This will be a deposit only account and you will never be charged or debited any funds. Your funds will be direct deposited into your account once your reservation has completed. </p>
                                <div className="ng-star-inserted">
                                    {/* <a href="javaScript:void(0)"> */}
                                    <button type="button" className="btn my-3 px-3 position-relative d-flex align-items-center justify-content-center">
                                        <img src={stripeBtn} alt='' />
                                    </button>
                                    {/* </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <div className="border px-4 py-4 mb-4">
                            <img src={paymentIcon} alt='' height="32px" className="mb-4" />
                            <h6 className="font-medium-bold text-black">HorseBnB Payments</h6>
                            <p >Always pay and communicate through HorseBnB to ensure you’re protected under our
                                <Link className="text-decoration-none" style={{ color: "#00a4b4" }} to="/terms-conditions">Terms of Service</Link>
                                , cancellation, and other safeguards. </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Payments