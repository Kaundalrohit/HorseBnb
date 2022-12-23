import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HenceForthApi from '../Utils/HenceForthApi'
import './ShowAllDetails.css'
import mapImg from '../Images/map.svg'
import { GoogleMap } from '@react-google-maps/api'
const ShowAllDetails = () => {

    const { type } = useParams() as any

    const [check, setCheck] = useState<boolean>(true)

    const [types, setType] = useState<any>(type)
    const [loading, setLoading] = useState<boolean>(false)

    const [state, setstate] = useState({
        shortTerm: []
    })

    HenceForthApi.setToken(localStorage.getItem('token'))

    const getCardData = async () => {
        setLoading(true)
        let res1 = (await HenceForthApi.listing.querylisting(types, 50, 1)).data
        setLoading(false)
        setstate({
            shortTerm: res1
        })

    }

    const handleRow = (e: any) => {
        setCheck(e.target.checked)
    }

    const handleType = async (e: any) => {
        let typesr = e.target.value
        setType(typesr);
        await getCardData()
    }
    useEffect(() => {
        getCardData()
        // eslint-disable-next-line
    }, [types])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className={!check ? `col-lg-12 overflow-scroll px-5` : `col-lg-6 overflow-scroll px-5`} style={{ height: '90vh' }}>
                        <div className="border-bottom pb-2">
                            <div className="d-flex flex-column">
                                <div className="col-md-12 d-flex mt-2 mb-3 mt-md-0 align-items-center justify-content-md-end">
                                    <span className="pr-2 wsp-nowrap mx-2">
                                        <img src={mapImg} className="pr-2" alt='' />Show map </span>

                                    <div className="form-check form-switch">
                                        <input className='form-check-input' type="checkbox" checked={check} onChange={(e: any) => { handleRow(e) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 d-flex justify-content-between flex-column flex-md-row">
                                <div className="badges d-flex align-items-center flex-wrap flex-grow-1 pr-md-3">
                                    <div className="mybadge pointer mr-2 my-2 ml-0">
                                        <select id="exampleFormControlSelect1" value={types} className="form-control type-select fw-700 ng-untouched ng-pristine ng-valid" onChange={(e: any) => handleType(e)}>
                                            <option value="1">Short Term Stalls</option>
                                            <option value="2">Monthly Board</option>
                                            <option value="3">Guest Accommodations</option>
                                            <option value="4">Horse Adventures</option>
                                        </select>
                                    </div>
                                    <label htmlFor="checkincheckout" className="mybadge pointer text-center mr-2 my-2 px-3 py-2 ng-star-inserted"> Check-in/Check-out <input type="text" id="checkincheckout" placeholder="Add dates" className="form-control date-input pl-0 ng-star-inserted d-none" />
                                    </label>
                                    <div className="mybadge pointer text-center mr-2 my-2 px-3 py-2">
                                        <span > Stalls   </span>
                                    </div>
                                    <div className="mybadge pointer text-center mr-2 my-2 px-3 py-2">
                                        <span > Prices   </span>
                                    </div>
                                    <div className="flex-grow-1 mr-2 my-2">
                                        <input ngx-google-places-autocomplete="" className="mybadge form-control lens-bg br-20 pb-0 pac-target-input" style={{ maxWidth: "300px" }} title="94, near Vishkarma Mandir, Vishwakarma Chowk, Sant Pura, Industrial Area- A, Ludhiana, Punjab 141003, India" placeholder="Enter a location" autoComplete="off" />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mb-3 cursor-pointer">Clear Filter </div>
                        </div>
                        <div className={loading ? `text-center my-3` : "text-center"}>
                            {loading && <div className="spinner-border text-info text-center" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                        </div>
                        {state.shortTerm.map((e: any, index: any) =>
                            <div className="d-flex flex-column flex-md-row border-bottom py-4 ng-star-inserted"><div className="position-relative"><div className="result-img mr-3">
                                <img alt="..." className="obj-cover  ng-star-inserted ng-lazyloaded" src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${e?.attributes?.publicData?.cover_photo?.url}`} />
                            </div>
                            </div>
                                <div className="d-flex flex-column justify-content-between">
                                    <div >
                                        <h4 className="font-medium-bold mt-2 mt-md-0 mb-4 text-black">{e?.attributes?.title?.slice(0, 10)}</h4>
                                        <span className="three-line-ellipsis">{e?.attributes?.description?.slice(0, 15)}</span>
                                    </div>
                                    <div className="font-medium ng-star-inserted">
                                        <span className="text-black"><b className="fw-600">${e?.attributes?.publicData?.listing_price} </b>
                                            <span className="ng-star-inserted">/Night</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="font-medium flex-grow-1 d-flex align-items-end justify-content-end">
                                    <Link to={`/booking-details/${e?.id?.uuid}`}>
                                        <button className="btn btn-primary mt-3">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={!check ? 'col-lg-6' : "d-none"}>
                        <GoogleMap />
                    </div>
                </div>
            </div>
        </>
    )

}
export default ShowAllDetails