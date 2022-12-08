import { useEffect, useState } from "react";
import ListingViewer from "./ListingViewer";
import HenceForthApi from "../../Utils/HenceForthApi"
import Search from "../Search/Search";
import { Link } from "react-router-dom";

export default function Listing() {

    HenceForthApi.setToken(localStorage.getItem('token'));

    // <................ Stalls declaration for stalls ................>
    const [list, setList] = useState<any>({
        shortTerm: [],
        guestAcc: [],
        monthly: [],
        horseAdv: [],
    })

    // <................ Rendering All Stalls Data ....................>
    useEffect(() => {
        const get = async () => {
            let post_page = 8;
            let page_no = 1;
            try {
                let res1 = (await HenceForthApi.listing.querylisting(1, post_page, page_no)).data
                let res2 = (await HenceForthApi.listing.querylisting(2, post_page, page_no)).data
                let res3 = (await HenceForthApi.listing.querylisting(3, post_page, page_no)).data
                let res4 = (await HenceForthApi.listing.querylisting(4, post_page, page_no)).data


                console.log(res1);
                console.log(res2);
                console.log(res3);
                console.log(res4);

                setList({
                    ...list,
                    shortTerm: res1,
                    monthly: res2,
                    guestAcc: res3,
                    horseAdv: res4,
                });

            } catch (error) {
                console.log(error);
            }
        }
        return () => {
            get();
        }
        // eslint-disable-next-line 
    }, [])

    const variousStalls = [
        {
            id: 1,
            url: 'https://horsebnb.com:8081/assets/img/change_short_term_stalls.jpg',
            title: 'Short Term Stalls'
        },
        {
            id: 2,
            url: 'https://horsebnb.com:8081/assets/img/monthly_board_home.jpg',
            title: 'Monthly Board'
        },

        {
            id: 3,
            url: 'https://horsebnb.com:8081/assets/img/home/guest_large.jpeg',
            title: 'Guest Accommodations'
        },
        {
            id: 4,
            url: 'https://horsebnb.com:8081/assets/img/home/exp_large.jpg',
            title: 'Horse Adventures & Equine Activities'
        },
    ]



    return (
        <>
            <Search />
            <div className="container">
                {/* <................... Explore HorseBnB .................................> */}
                <div className="explore py-5">
                    <h2 className="heading-secondary text-black pb-3">Explore HorseBnB</h2>
                    <div className="row">
                        {variousStalls.map((e: any, index: any) =>
                            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 cursor-pointer" key={index}>
                                <Link to={`/page/${e.id}`}
                                    className="text-decoration-none">
                                    <div className="shadow bg-white">
                                        <div className="explore-out">
                                            <img alt="..." className="obj-contain explore-img card-img rounded-top  " src={e.url} />
                                            <div className="d-flex justify-content-between p-1">
                                                <span className="text-black font-small fw-600 pt-1">{e.title}</span>
                                                <span className="arw-outer d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-arrow-right-square-fill text-success h3 pe-1"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                    </div>
                </div>

                {/* <................... Introduction .................................> */}

                <div className="pb-5 rounded-3">
                    <div className="position-relative">
                        <div className="intro-img">
                            <img alt="..." className="obj-cover  ng-lazyloaded img-fluid rounded-3 " src="https://horsebnb.com:8081/assets/img/no_introducing_horsebnb.png" />
                        </div>
                        <div className="intro-content pl-5">
                            <span >INTRODUCING</span>
                            <h1 className="mb-2">HorseBnB</h1>
                            <Link to="/about-us">
                                <button className="btn bg-light text-dark " >About Us</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* <................... SHORT TERM STALLS.................................> */}

                <div className="container">
                    <h3>Short Term Stalls</h3>
                    <p>Traveling with your horse? Find overnight accommodations for your horse</p>
                </div>
                <div className="container">
                    <div className="row">

                        {Array.isArray(list.shortTerm) && list.shortTerm.length ? list.shortTerm.map((res1: any, index: any) =>
                            <ListingViewer
                                description={res1?.attributes?.description}
                                title={res1?.attributes?.title}
                                listing_price={res1?.attributes?.publicData?.listing_price}
                                image={res1?.attributes?.publicData?.cover_photo?.url}
                                id={res1?.id?.uuid}

                            />

                        )
                            :
                            <div className="d-flex justify-content-center">


                                < img className='p-2' alt="" src={'https://horsebnb.com:8081/assets/img/create-stalls/empty.png'} width="253" height="168" />
                            </div>
                        }
                    </div>
                </div>

                <Link to="/page/1" className="text-decoration-none">
                    <div className="container my-3">
                        <div className="heading h5">
                            <span style={{ color: "#00a4b4" }}>
                                Show all Short Term Stalls
                            </span>
                            <img src="https://horsebnb.com:8081/assets/img/blue-arw.svg" alt="" />
                        </div>
                    </div>
                </Link>
                {/* <................... GUEST ACCOMMODATIONS .........................> */}

                <div className="container mt-4" >
                    <h3>Guest Accommodations</h3>
                    <p>Traveling with your horse? Find overnight accommodations for yourself</p>
                </div>

                <div className="container">
                    <div className="row">
                        {Array.isArray(list.guestAcc) && list.guestAcc.length ? list.guestAcc.map((res1: any, index: any) => <ListingViewer
                            description={res1?.attributes?.description}
                            title={res1?.attributes?.title}
                            listing_price={res1?.attributes?.publicData?.listing_price}
                            image={res1?.attributes?.publicData?.cover_photo?.url}
                            id={res1?.id?.uuid}
                        />)
                            :
                            <div className="d-flex justify-content-center">

                                < img className='p-2' alt="" src={'https://horsebnb.com:8081/assets/img/create-stalls/empty.png'} width="253" height="168" />
                            </div>
                        }
                    </div>
                </div>

                <Link to="/page/3" className="text-decoration-none">
                    <div className="container my-3">
                        <div className="heading h5">
                            <span style={{ color: "#00a4b4" }}>
                                Show all Guest Accommodations
                            </span>
                            <img src="https://horsebnb.com:8081/assets/img/blue-arw.svg" alt="" />
                        </div>
                    </div>
                </Link>



                {/* <................... Monthly stabling for your horse  ..........................> */}
                <div className="content-heading pb-5 mt-4">
                    <h2 className="heading-secondary text-black">
                        Monthly stabling for your horse
                    </h2>
                    <p className="pb-2">Find monthly boarding facilities</p>
                    <div className="position-relative monthly-stable">
                        <div className="intro-img">
                            <img alt="..." className="obj-cover  ng-lazyloaded img-fluid rounded-2" src="https://horsebnb.com:8081/assets/img/no_monthly_banner.png" />
                        </div>
                        <button className="btn bg-white text-black d-flex align-items-center align-self-center">
                            EXPLORE BOARDING FACILITIES
                            <i className="bi bi-arrow-right-short ms-1 fw-bold"></i>
                        </button>
                    </div>
                </div>

                {/* <................... Monthly Stabled Horse Maping ...........................> */}

                <div className="container">
                    <div className="row">
                        {Array.isArray(list.monthly) && list.monthly.length ? list.monthly.map((res1: any, index: any) => <ListingViewer
                            description={res1?.attributes?.description}
                            title={res1?.attributes?.title}
                            listing_price={res1?.attributes?.publicData?.listing_price}
                            image={res1?.attributes?.publicData?.cover_photo?.url}
                            id={res1?.id?.uuid}
                        />)
                            :
                            <div className="d-flex justify-content-center">

                                < img className='p-2' alt="" src={'https://horsebnb.com:8081/assets/img/create-stalls/empty.png'} width="253" height="168" />
                            </div>
                        }
                    </div>
                </div>
                <Link to="/page/2" className="text-decoration-none">
                    <div className="container my-3">
                        <div className="heading h5">
                            <span style={{ color: "#00a4b4" }}>
                                Show all Monthly Boards
                            </span>
                            <img src="https://horsebnb.com:8081/assets/img/blue-arw.svg" alt="" />
                        </div>
                    </div>
                </Link >


                {/* <................... Horse Adventure  .........................> */}

                <div className="container mt-4">
                    <h3>Horse Adventures & Equine Activities</h3>
                    <p>Equestrian adventures</p>
                </div>

                <div className="container mb-4">
                    <div className="row">
                        {Array.isArray(list.horseAdv) && list.horseAdv.length ? list.horseAdv.map((res1: any, index: any) => <ListingViewer
                            description={res1?.attributes?.description}
                            title={res1?.attributes?.title}
                            listing_price={res1?.attributes?.publicData?.listing_price}
                            image={res1?.attributes?.publicData?.cover_photo?.url}
                            id={res1?.id?.uuid}
                        />)
                            :
                            <div className="d-flex justify-content-center">

                                < img className='p-2' alt="" src={'https://horsebnb.com:8081/assets/img/create-stalls/empty.png'} width="253" height="168" />
                            </div>
                        }
                    </div>
                </div>
                <Link to="/page/4" className="text-decoration-none">

                    <div className="container mt-2 mb-5">
                        <div className="heading h5">
                            <span style={{ color: "#00a4b4" }}>
                                Show all Horse Adventures and Activities
                            </span>
                            <img src="https://horsebnb.com:8081/assets/img/blue-arw.svg" alt="" />
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}