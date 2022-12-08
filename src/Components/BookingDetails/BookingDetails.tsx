import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HenceForthApi from '../Utils/HenceForthApi';
import './BookingDetails.css'
const BookingDetails = () => {
    const { id } = useParams() as any

    const [bookingDetails, setBookingDetails] = useState<any>([])
    const [hostData, setHostData] = useState([])

    useEffect(() => {
        const getUserData = async () => {
            let res = (await HenceForthApi.Auth.bookingListid(id)).data
            let res1 = (await HenceForthApi.hostListing.queryListing(res.id.hostId, 3, 1)).data
            setBookingDetails(res)
            setHostData(res1)
        }
        getUserData()
    }, [id])

    console.log(bookingDetails);
    console.log(hostData);

    return (
        <>
            <div className="container">
                <div className="heading">
                    <h1 className="heading-big text-black float-left">{bookingDetails?.attributes?.title}</h1>
                </div>
                <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex">
                        <span className="text-black d-flex align-items-start">
                            <img alt="star" src="https://horsebnb.com:8081/assets/img/star-red.svg" className="pr-1" /> 4 <span className="text-lite"> &nbsp;(1 Reviews)</span>
                        </span>
                        <span className="text-underline ml-2"> mohali,  Punjab </span>
                    </div>
                    <div >
                        <div className="pointer text-underline wsp-nowrap">
                            <img src="https://horsebnb.com:8081/assets/img/share.svg" alt='share' className="pe-2" />Share </div>
                    </div>
                </div>

                <div className="row mb-5 mx-0">
                    <div className="col-md-6 px-md-0 p-0">
                        <div className="book-img-lg">
                            <img alt="..." className="border obj-cover  ng-star-inserted ng-lazyloaded" src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${bookingDetails?.attributes?.publicData?.cover_photo?.url}`} />
                        </div>
                    </div>
                    <div className="col-md-6 px-md-0 p-0 d-flex flex-wrap">
                        <div className="col-md-12 px-md-0 p-0">
                            <div className="book-img-sm d-flex flex-wrap h-100" style={{ height: "360px" }}>
                                {(bookingDetails?.attributes?.publicData?.images)?.slice(0, 4).map((e: any, index: any) =>
                                    <div key={index} className="col-6 p-0 ng-star-inserted" style={{ height: "180px" }}>
                                        <img className="border obj-cover" src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${e?.url}`} alt='' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* <..........................................................> */}

                <div className="row">
                    <div className="col-md-6 col-lg-8">
                        <div className="d-flex justify-content-between border-bottom pb-3 align-items-center">
                            <div >
                                <h2 className="font-22-bold text-black my-0 line-height-space" > business  hosted by {bookingDetails?.attributes?.publicData?.hosted_by
                                }</h2>
                            </div>
                            <div className="round-img ml-3">
                                <img className="obj-cover  ng-star-inserted ng-lazyloaded" alt='' style={{ width: "70px" }} src={`${bookingDetails?.attributes?.publicData?.host_image
                                    }`} />
                            </div>
                        </div>
                        <div className="border-bottom py-3">
                            <div className="d-flex align-items-center">
                                <span >
                                    <img src="https://horsebnb.com:8081/assets/img/short_long.png" alt='' className="pr-3 w-100 ng-star-inserted" />
                                </span>
                                <span >
                                    <h5 className="m-0 font-medium-bold text-black ng-star-inserted"> Short Term Stalls </h5>
                                </span>
                            </div>
                        </div>

                        <div className="border-bottom py-3">
                            <div className="d-flex align-items-center">
                                <span >
                                    <img src="	https://horsebnb.com:8081/assets/img/spray.png" alt='' className="pr-3" />
                                </span>
                                <span >
                                    <h5 className="m-0 font-medium-bold text-black">Friendly and responsive host</h5>
                                </span>
                            </div>
                        </div>

                        <div className="border-bottom py-3">
                            <div className="d-flex align-items-center">
                                <span >
                                    <img src="https://horsebnb.com:8081/assets/img/home.png" alt='' className="pr-3" />
                                </span>
                                <span >
                                    <h5 className="m-0 font-medium-bold text-black">Great check-in experience</h5>
                                </span>
                            </div>
                        </div>

                        <div className="border-bottom py-3">
                            <div className="d-flex align-items-start">
                                <span >
                                    <img src="https://horsebnb.com:8081/assets/img/tag.png" alt='' className="pr-3" />
                                </span>
                                <span >
                                    <h5 className="m-0 font-medium-bold text-black">Cancellation policy</h5>
                                    <div className="d-flex">
                                        <p className="text-lite mt-0 mb-0">100% refundable if cancelled prior to 24 hours before check in time.</p>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="border-bottom py-3">
                            <h3 className="font-22-ebold m align-items-centerb-3 text-black mt-0">Description</h3>
                            <p className="m-0 ng-star-inserted">
                                <span className="three-line-ellipsis">{bookingDetails?.attributes?.description} </span>
                            </p>
                        </div>
                        <div className="col-md-12">
                            <h4 className="fw-600 heading-big mb-4">Select check-in date</h4>
                            <div className="date my-3">
                                <input type="date" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div id="booking-data" className="booking-data p-3">
                            <form className="ng-untouched ng-pristine ng-invalid">
                                <div className="border br-6 row mx-0">
                                    <div className="d-flex w-100 ng-star-inserted">
                                        <div className="border-right col-6 p-2 px-3">
                                            <label htmlFor="enddate" className="color-light-grey position-relative d-flex justify-content-center flex-column align-items-center p-2 px-3 text-black font-mini fw-700">
                                                <input id="enddate" className="date-picker-input text-black font-mini fw-700 ng-untouched ng-pristine ng-invalid" />CHECK-IN <p className="mb-0 font-small fw-300 mt-0" >  </p>
                                            </label>
                                        </div>
                                        <div className="col-6 p-2 px-3">
                                            <label htmlFor="enddate1" className="color-light-grey position-relative d-flex justify-content-center flex-column align-items-center p-2 px-3 text-black font-mini fw-700">
                                                <input id="enddate1" className="date-picker-input text-black font-mini fw-700 ng-untouched ng-pristine ng-invalid" />CHECK-OUT <p className="mb-0 font-small fw-300 mt-0">  </p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-100 border-top p-2 px-3 stall-dropdown">
                                        <span className="d-flex justify-content-center p-2 font-small fw-700 ng-star-inserted"> ADD STALLS </span>
                                    </div>
                                </div>
                            </form>
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
                </div>

                <div className="border-bottom pt-4">
                    <h3 className="font-22-ebold mb-4 text-black">Amenities</h3>
                    <div className="row">
                        {(bookingDetails?.attributes?.publicData?.amenities)?.map((e: any, index: any) =>
                            <div className="col-md-4 ng-star-inserted" key={index}>
                                <div >
                                    <div className="d-flex align-items-center mb-3 fw-600">
                                        <img src="https://horsebnb.com:8081/assets/img/horse_one.png" alt='' className="pe-2 " />
                                        {e}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="">
                    <div className="mt-5">
                        <h3 className="font-22-ebold mb-4 text-black d-flex">
                            <img src="	https://horsebnb.com:8081/assets/img/starr.svg" alt='' className="pr-2" /> 4 (1 Reviews) </h3>
                    </div>

                    <div className="justify-content-between">
                        <div className="row ng-star-inserted">
                            <div className="col-md-12 p-3 border-bottom ng-star-inserted">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="rev-img d-inline-block mr-3">
                                        <img className="obj-cover  ng-star-inserted ng-lazyloaded" alt='' src="https://horsebnb.s3.us-east-2.amazonaws.com/Uploads/Images/Original/1669956667967-disney-6993478__340.png" />
                                    </div>
                                    <div className="d-flex flex-column flex-grow-1">
                                        <h6 className="text-black font-medium-bold mb-0">preet preet </h6>
                                        <p className="text-line font-small mb-0">Dec 2, 2022, 1:16 PM</p>
                                    </div>
                                </div>
                                <p className="font-regular-sm m-0 quotes three-line-ellipsis"> review given by user
                                </p>
                            </div>
                            <div className="col-md-12 mb-4 d-flex justify-content-center align-items-center ng-star-inserted">
                                <button className="btn btn-primary my-3">Show More Reviews</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row border-bottom mt-2">
                    <div className="col-md-6 border-right px-4 my-4">
                        <div className="pr-md-5 d-flex align-items-center">
                            <div className="d-flex align-items-start">
                                <div className="rev-img d-inline-block mr-3">
                                    <img className="obj-cover  ng-star-inserted ng-lazyloaded" alt='' src={` 
                                 ${bookingDetails?.attributes?.publicData?.host_image}
                                 `} />
                                </div>
                                <div className="d-inline-block">
                                    <h6 className="text-black font-22-bold">Hosted By {bookingDetails?.attributes?.publicData?.hosted_by
                                    } </h6>
                                    <p className="text-line font-small mb-0 mt-2"> Joined on
                                        {
                                            (new Date(bookingDetails?.attributes?.publicData?.joined_in)).toLocaleDateString()
                                        }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-4 my-4">
                        <div className="d-flex align-items-start">
                            <img src="https://horsebnb.com:8081/assets/img/security.svg" alt='' className="seurity-img pr-3" />
                            <div className="d-flex flex-column align-items-start">
                                <p className="text-black fw-300 mt-0">To protect your payment, never transfer money or communicate outside of the HorseBnB website or app.</p>
                                <button type="button" className="btn btn-outline-danger ng-star-inserted">Contact host </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row border-bottom">
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <h6 className="text-black font-22-bold"> {bookingDetails?.attributes?.publicData?.hosted_by
                            }'s Listings </h6>
                            <button type="button" className="btn btn-outline-dark ng-star-inserted">View All</button>
                        </div>
                    </div>
                    <div className="rightcol-image w-100">
                        <div className="rightcol-image-detail">
                            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">

                                {hostData?.map((e: any, index: any) =>
                                    <div className="col py-3 ng-star-inserted" key={index}>
                                        <Link to={`/booking-details/${e.id}?listing=${e.id}`} className='text-decoration-none text-black'>
                                            <div className="image-detail">
                                                <img alt="" className="obj-cover" src={`${HenceForthApi.API_FILE_ROOT_SMALL}${e?.cover_photo}`} />
                                            </div>
                                            <div className="image-content">
                                                <div className="text-turncate three-line-ellipsis pt-2 ng-star-inserted" style={{ fontWeight: "700" }}> Short Term Stall</div>
                                            </div>
                                            <div className="image-about">
                                                <div className="image-content">
                                                    <div className="row m-0">
                                                        <div className="col-12 p-0 d-flex">
                                                            <div className="image-about-detail flex-grow-1 pr-2">
                                                                <h6 >{e.listing_price}</h6>
                                                            </div>

                                                            <div className="starimg">
                                                                <img src="https://horsebnb.com:8081/assets/img/profile/grade-24px.png" alt="" />
                                                                <span >4</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                )}


                            </div>
                        </div>
                    </div>
                </div>
                {/* <.......container-End..............> */}
            </div>
        </>
    )
}
export default BookingDetails;