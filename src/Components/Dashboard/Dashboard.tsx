const Dashboard = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-4 col-lg-3 d-none d-lg-block">
                    <div className="sidebar pb-4 mb-5">
                        <div className="side-head d-flex align-items-center justify-content-start">
                            <div className="side-img me-3">
                                <img className="obj-cover" src="https://horsebnb.s3.us-east-2.amazonaws.com/Uploads/Images/Medium/1671514507380-Albert.png" />
                            </div>
                            <div >
                                <h3 className="font-22-bold text-black lsp-4">Hence Forth</h3>
                                <p className="text-primary text-center m-0 font-14">Service Provider</p>
                            </div>
                        </div>
                        <ul className="menu py-3 pl-0">
                            <li>
                                <a> Dashboard </a>
                            </li>
                            <li>
                                <a>Host Bookings </a>
                            </li>
                            <li>
                                <a>Reviews </a>
                            </li>
                            <li>
                                <a>Transactions </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard