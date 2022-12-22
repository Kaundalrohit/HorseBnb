import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import HenceForthApi from "../Utils/HenceForthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import stripeBtn from '../Images/connect_stripe_buttin.png'
import checkCircleImg from '../Images/check-circle-primary.svg'
import preDefaultImg from '../Images/default_image.png'



export default function Publish() {
    const match = useMatch('/manage-listing/publish-listing/:id')
    HenceForthApi.setToken(localStorage.getItem('token'));
    const navigate = useNavigate()

    const [coverImg, setCoverImg] = useState<any>()
    const [check, setCheck] = useState()

    const [preview, setPreview] = useState({
        description: "",
        title: "",
        address: "",
        price: 0
    })
    const { description, title, address, price } = preview



    useEffect(() => {
        const getData = async () => {
            try {
                let res = await HenceForthApi.Auth.Listid(match?.params.id)
                setCoverImg(res.data.attributes.publicData.cover_photo);
                setPreview({
                    ...preview,
                    description: res?.data?.attributes?.description,
                    title: res?.data?.attributes?.title,
                    address: res?.data?.attributes?.publicData?.address?.location,
                    price: res?.data?.attributes?.price?.amount

                })
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [])

    const publishList = async () => {
        if (check) {
            try {
                await HenceForthApi.Auth.publishListing({
                    id: match?.params.id,
                })
                toast('🦄 Post Publisted', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate(`/manage-listing`)
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            toast('🦄 Please agree to our term & conditions', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <>
            <div >
                <div className="row mx-0">
                    <ToastContainer />

                    <div className="col-md-6 py-5 h-md-auto frame-height overflow-y-auto">
                        <div className="col-lg-8 col-md-11 px-md-0 mx-auto">
                            <h3 className="heading-big mb-3">Get ready to start hosting</h3>
                            <p >You are almost finished! If you are happy with your listing you can publish it now. If you want to edit any information you can also do that now.</p>
                            <div >
                                <div className="d-flex border-bottom py-3 justify-content-between">
                                    <div className="d-flex">
                                        <img src={checkCircleImg} className="pe-3 align-self-start" alt="" />
                                        <span className="font-medium-bold text-black d-block fw-bold">Edit your listing?</span>
                                    </div>
                                    <div className="">
                                        <Link to={`/create-stall/step1/${match?.params.id}`} className="text-skyblue fw-600  text-decoration-none" style={{ color: "#00a4b4" }}>Edit</Link>
                                    </div>
                                </div>
                                <div className="border-bottom py-3">
                                    <div className="ng-star-inserted">
                                        <div className="my-3 px-0 position-relative d-flex align-items-center justify-content-center">
                                            <img src={stripeBtn} alt="" />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label className="tickbox tickbox-sm text-default"> By publishing your listing, you agree to our <u style={{ cursor: "pointer" }} > Terms and Conditions</u> and have read our <u style={{ cursor: "pointer" }}  >Privacy Policy</u>.
                                            <input value={check} onChange={(e: any) => {
                                                setCheck(e.target.checked)
                                            }} type="checkbox" className="ng-untouched ng-pristine ng-invalid" />
                                            <span className="checkmark skyblue"></span>
                                        </label>
                                    </div>

                                </div>
                                <button className="btn btn-primary px-3 mt-5 py-2 ng-star-inserted"
                                    onClick={publishList}> Publish listing </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-0">
                        <div className="py-5 h-100 d-flex align-items-start px-md-5 bg-light justify-content-start">
                            <div className="border col-md-12 col-lg-7 px-4 py-4 mb-4 bg-white">
                                <div className="host-img mb-1">
                                    <img className="obj-cover  ng-star-inserted ng-lazyloaded" alt=""
                                        src={coverImg?.url ? `${HenceForthApi.API_FILE_ROOT_MEDIUM}${coverImg?.url}` : preDefaultImg} />
                                </div>
                                <p className="text-lite mb-1 font-small">{address}</p>
                                <p className="mb-1 font-small w-100 single-line-ellipsis">{title}</p>
                                <p className="text-black font-regular-sm mb-1 w-100 single-line-ellipsis">{description}</p>
                                <p className="text-black mb-0 ng-star-inserted"><span className="fw-600">${ }</span> /Night    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}