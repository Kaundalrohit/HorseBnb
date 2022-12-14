import nextBtnImg from '../Images/key_sky.svg'
import paymentIcon from '../Images/line.svg'
import userImgIcon from '../Images/business-card.svg'
import passImg from '../Images/Key.svg'
import { Link } from 'react-router-dom'
const Account = () => {
    return (
        <>
            <div className="container pb-5 min-frame-height" style={{ height: "90vh" }}>
                <h1 className="heading-large mb-1 text-black line-height-space">Account</h1>
                <p className="mb-0 mt-3"><b >Rohit Kumar</b>, rohit.kumar.henceforth@gmail.com </p>
                <div className="row my-4">
                    <div className="col-md-4 mb-5 mb-md-0" tabIndex={0}>
                        <Link to='/account/personal-info' className='text-decoration-none text-black'>
                            <div className="acc-box">
                                <h4 className="font-22-bold text-black mb-3">
                                    <img src={userImgIcon} height="24px" className="mr-2" /> Personal info <img src={nextBtnImg} />
                                </h4>
                                <p className="mb-0">Provide personal details and how we can reach you</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0" tabIndex={0}>
                        <Link to='/account/update-password' className='text-decoration-none text-black'>
                            <div className="acc-box">
                                <h4 className="font-22-bold text-black mb-3">
                                    <img src={passImg} height="24px" className="mr-2" /> Update Password <img src={nextBtnImg} />

                                </h4>
                                <p className="mb-0">Update your password and secure your account</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4" tabIndex={0}>
                        <Link to='/account/payments-and-payouts' className='text-decoration-none text-black'>
                            <div className="acc-box">
                                <h4 className="font-22-bold text-black mb-3">
                                    <img src={paymentIcon} height="24px" className="mr-2" /> Payments <img src={nextBtnImg} />
                                </h4>
                                <p className="mb-0">Receive payments from HorseBnB reservations</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Account