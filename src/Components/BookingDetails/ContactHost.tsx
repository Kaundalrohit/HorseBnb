import { useEffect } from "react";
import HenceForthApi from "../Utils/HenceForthApi";

type props = {
    count: number;
    setCount: (value: number) => void
    setHostPage: (value: boolean) => void
    hostImg: string;
    isImage: (url: string) => boolean
    title: string
    amenities: any
    description: string
    hostName: string

}
const ContactHost = (props: props) => {


    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, [])
    const { count, setCount, setHostPage, hostImg, isImage, title, description, hostName, amenities } = props
    return (
        <>
            <div className="container my-5 ng-star-inserted">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={() => {
                            console.log('hello');

                            setHostPage(true)
                        }} className="btn border-0">
                            <img src="https://horsebnb.com:8081/assets/img/back_arrow.svg" className="mb-2 position-relative" alt="" style={{ left: "-10px" }} />
                        </button>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="d-flex justify-content-between border-bottom pb-3 align-items-center">
                                <div >
                                    <h2 className="font-22-bold text-black my-0 line-height-space"> {hostName} </h2>
                                    <p className="font-small">
                                        <span > {title} </span>
                                    </p>
                                </div>
                                <div className="round-img">
                                    <img className="obj-cover  ng-star-inserted ng-lazyloaded" alt="" src={
                                        isImage(hostImg)
                                            ?
                                            `${HenceForthApi.API_FILE_ROOT_SMALL}${hostImg}`
                                            :
                                            hostImg
                                    } />
                                </div>
                            </div>
                            <div className="border-bottom py-3">
                                <p>
                                    {description}
                                </p>
                            </div>
                            <div className="border-bottom pt-4">
                                <h3 className="font-22-ebold mb-4 text-black">Amenities</h3>
                                <div className="row">
                                    {amenities.map((e: any, index: any) =>
                                        <div className="col-md-4 ng-star-inserted" key={index}>
                                            <div className="d-flex align-items-center mb-3 fw-600">
                                                <img src="https://horsebnb.com:8081/assets/img/horse_one.png" alt="" className="pr-2" /> {e} </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="my-4">
                                <div >
                                    <h4 className="fw-600">Still have questions? Message the host</h4>
                                </div>
                                <div >
                                    <div className="d-flex align-items-center justify-content-between bg-white py-2">
                                        <div className="w-100 mr-2">
                                            <textarea rows={5} placeholder="Type a message here…" className="form-control ng-untouched ng-pristine ng-valid">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <button className="btn btn-primary send-icon cursor-pointer position-relative d-flex align-items-center justify-content-center"> Send Message </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div id="booking-data" className="booking-data p-3">

                                <div className="border br-6 row mx-0">

                                    <div className="d-flex border w-100 ng-star-inserted">
                                        <div className="col-6 p-2 px-3">
                                            <label htmlFor="enddate" className="color-light-grey position-relative d-flex justify-content-center flex-column align-items-center p-2 px-2 text-black font-mini fw-700">
                                                <input id="enddate" type="date" className="mb-1 date-picker-input text-black font-mini fw-700 ng-untouched ng-pristine ng-invalid" />CHECK-IN <p className="mb-0 font-small fw-300 mt-0" ></p>
                                            </label>
                                        </div>
                                        <div className=" border-start col-6 p-2 px-3">
                                            <label htmlFor="enddate1" className="color-light-grey position-relative d-flex justify-content-center flex-column align-items-center p-2 px-2 text-black font-mini fw-700">
                                                <input id="enddate1" type="date" className="mb-1 date-picker-input text-black font-mini fw-700 ng-untouched ng-pristine ng-invalid" />CHECK-OUT <p className="mb-0 font-small fw-300 mt-0">  </p>
                                            </label>
                                        </div>
                                    </div>


                                    < button
                                        type="button" className="btn border-0 d-flex justify-content-center p-2" data-bs-toggle="modal" data-bs-target="#examplemodal"> ADD STALLS
                                    </button>
                                    {/* <.................Modal.................> */}
                                    <div className="modal fade" id="examplemodal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Stalls</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="d-flex mb-0 pt-1 modal-body">
                                                    <h5 className="font-medium-bold">Stalls</h5>
                                                    <div className="input-group d-flex justify-content-end">
                                                        <div className="input-group-prepend">
                                                            <button className="btn border-0" onClick={(e: any) => {
                                                                // e.preventDefault()
                                                                setCount(count - 1)
                                                            }}
                                                                disabled={count === 0}
                                                            >
                                                                <img src="https://horsebnb.com/assets/img/remove_circle_outline.svg" alt="" width="18px" />
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control text-center border-1" value={count} style={{ flex: "0.1 1 auto" }} />
                                                        <div className="input-group-prepend">
                                                            <button className="btn border-0" onClick={(e: any) => {
                                                                // e.preventDefault()
                                                                setCount(count + 1)
                                                            }}>
                                                                <img src="https://horsebnb.com/assets/img/add_circle_outline.svg" alt="" width="18px" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer d-flex justify-content-between">
                                                    <div className="">
                                                        <img src="https://horsebnb.com:8081/assets/img/chevron-left-primary.svg" alt="" />
                                                        <button type="button" className="btn border-0"
                                                            style={{ color: "#00a4b4" }} data-bs-dismiss="modal">Cancel</button>
                                                    </div>
                                                    <div className="">
                                                        <button type="button" className="btn btn-primary">Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <table className="table borderless details-table mb-0">
                                    <tbody className="ng-star-inserted">
                                        <tr >
                                            <td className="color-light-grey">Price per night</td>
                                            <td className="text-right">$5 </td>
                                        </tr>
                                        <tr >
                                            <td className="color-light-grey">Nights</td>
                                            <td className="text-right">x0</td>
                                        </tr>
                                        <tr className="ng-star-inserted">
                                            <td className="color-light-grey"> Stalls   </td>
                                            <td className="text-right"> x0 </td>
                                        </tr>
                                        <tr className="border-top ng-star-inserted">
                                            <td className="border-top">Sub-total</td>
                                            <td className="text-right"> $0 </td>
                                        </tr>
                                        <tr className="ng-star-inserted">
                                            <td className="color-light-grey">Service fee</td>
                                            <td className="text-right"> $0.00 </td>
                                        </tr>
                                        <tr className="border-top ng-star-inserted">
                                            <td >Total (USD)</td>
                                            <td className="text-right"> $0.00 </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <button title="Owner booking not allowed" className="btn btn-block btn-primary my-3 fixed-footer-btn cursor-pointer">Reserve</button>
                            </div>
                        </div>


                        {/* <.....> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContactHost