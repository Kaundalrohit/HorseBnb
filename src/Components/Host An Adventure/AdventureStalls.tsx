import { Link } from "react-router-dom";

const AdventureStalls = () => {
    return (
        <div>
            <div className="min-frame-height host-exp">
                <div className="container">
                    <div className="row padd-y-host align-items-center">
                        <div className="col-md-6 mb-5 mb-md-0">
                            <div >
                                <span className="font-small fw-700 text-black">HOST ADVENTURES ON HORSEBNB</span>
                                <h1 className="mb-4">Earn <span className="text-primary">money</span> sharing your <span className="text-primary">horse Adventures </span> with the world. </h1>
                                <Link to="/add-experience/step1">
                                    <button className="btn btn-black" tabIndex={0} ng-reflect-router-link="/add-experience">Let's go</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="col-md-9 px-0 ml-auto">
                                <img src="https://horsebnb.com/assets/img/host/jonathan.png" alt="" className="w-100" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light py-3">
                    <div className="container">
                        <div className="text-center mb-5">
                            <img src="https://horsebnb.com/assets/img/ms-icon-70x70.png" alt="" className="mb-3" style={{ height: "45px" }} />
                            <p className="font-medium col-md-6 mx-auto">HorseBnB Adventures are horse activities created by horse people for anyone and everyone. Whether you’ve never ridden a horse or you are an experienced horse person, there is a horse adventure for you. All skill levels are welcome with HorseBnB Adventures. </p>
                            <hr className="host-hr text-center mx-auto" />
                        </div>
                    </div>
                </div>
                <div >
                    <div className="container py-3 mb-4">
                        <div className="text-center">
                            <h2 >How it works</h2>
                            <hr className="host-hr mb-4  mx-auto" />
                            <p className="font-medium col-md-6 mx-auto">Hosting a horse adventures is simple with HorseBnB. To start hosting follow the simple steps below. </p>
                        </div>
                        <div className="row align-items-center padd-y-works px-md-5">
                            <div className="col-md-6 mb-5 mb-sm-0">
                                <div className="col-md-9 px-0">
                                    <img src="https://horsebnb.com/assets/img/design_your_experience.png" className="w-100" alt="" />
                                </div>
                            </div>
                            <div className="col-md-6"><div >
                                <h5 className="font-22-ebold text-black mb-4"> Design your adventure </h5>
                                <p className="lh-30">All adventures start with our quality standards. Think about how to engage with guests online and make your adventure stand out from the pack. This includes using high quality pictures and great descriptions to attract customers.</p>
                                <hr className="host-hr ml-0 mb-0" />
                            </div>
                            </div>
                        </div>
                        <div className="row align-items-center padd-y-works px-md-5">
                            <div className="col-md-6"><div >
                                <h5 className="font-22-ebold text-black mb-4">Submit your adventure</h5>
                                <p className="lh-30">Click the “Start creating your adventure” button to create your horse adventure listing. Follow the steps to create a listing that includes a complete description of your horse adventure, pictures of your adventure, what’s included, and what guests need to bring. </p>
                                <hr className="host-hr ml-0 mb-0" />
                            </div>
                            </div>
                            <div className="col-md-6 mb-5 mb-sm-0">
                                <div className="col-md-9 px-0 ml-md-auto">
                                    <img src="https://horsebnb.com/assets/img/submit_your_experience.png" className="w-100" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center padd-y-works px-md-5">
                            <div className="col-md-6 mb-5 mb-sm-0">
                                <div className="col-md-9 px-0 mr-md-auto">
                                    <img src="https://horsebnb.com/assets/img/host/jefferson.png" alt="" className="w-100" />
                                </div>
                            </div>
                            <div className="col-md-6 order-1 order-sm-0">
                                <div >
                                    <h5 className="font-22-ebold text-black mb-4">Start hosting</h5>
                                    <p className="lh-30">Once your listing is complete you’re ready to host your first guests. Be sure to prepare everything you need to provide your guests with the best horse adventure possible!</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <Link to="/add-experience/step1">
                                <button className="btn btn-primary-outline-lg" tabIndex={0} ng-reflect-router-link="/add-experience">Start creating your adventure</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="host-exp-bg">
                    <div className="col-md-6 px-md-0 text-center">
                        <h3 className="mb-3">Learn more about hosting with HorseBnB Adventures</h3>
                        <Link to="/add-experience/step1">
                            <button type="button" className="btn btn-white-outline px-3 py-2" tabIndex={0} ng-reflect-router-link="/add-experience">Let’s go</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdventureStalls;