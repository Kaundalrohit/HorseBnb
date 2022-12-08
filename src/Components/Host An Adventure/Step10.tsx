import { Link } from "react-router-dom"

const Step10 = () => {
    return (
        <>
            <div className="selectCol">
                <div className="container">
                    <div className="title">
                        <h4 className="heading-big text-black text-center my-4">Select Availability Type </h4>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col col-sm-6">
                                <Link to="">
                                    <div className="selectCard ">
                                        <div className="">
                                            <i className="bi bi-calendar-check h1"></i>
                                        </div>
                                        <span className="text-black text-decoration-none">Single Day Adventure</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col col-sm-6">
                                <Link to="">
                                    <div className="selectCard">
                                        <div className="">
                                            <i className="bi bi-calendar3 h1"></i>
                                        </div>
                                        <span >Multiple Day Adventure</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Step10