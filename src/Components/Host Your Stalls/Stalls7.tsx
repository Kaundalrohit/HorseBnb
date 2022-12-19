import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import backArrow from '../Images/chevron-left-primary.svg'
import bulbImg from '../Images/lightbulb.svg'
import deleteImg from '../Images/delete-24px.svg'
import editImg from '../Images/edit.png'
import publisgImg from '../Images/publish.svg'



type props = {
    steps: any,
    setSteps: any
}

export default function Stall7(props: props) {
    const { steps, setSteps } = props

    HenceForthApi.setToken(localStorage.getItem('token'));
    const match = useMatch(`/create-stall/step7/:id`)
    const navigate = useNavigate()


    const [checkCoverImg, setCheckCoverImg] = useState<any>({
        // caption: null,
        // id: '',
        // priority: 0,
        // url: ""
    })
    const [loader, setLoader] = useState<boolean>(false)


    const [imgfile, setImgFile] = useState<any>([])

    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setCheckCoverImg(res.data.attributes.publicData.cover_photo);
            setImgFile(res.data.attributes.publicData.images)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted)
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            let res = await HenceForthApi.Auth.getdata()
            console.log(res.data.attributes.profile.publicData.country_code);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listId()
        getData();
        // eslint-disable-next-line 
    }, [])


    const fileSelectedHandler = async (e: any) => {
        // debugger
        let files = e.target.files[0];
        // debugger
        try {
            let imgApi = (await HenceForthApi.Auth.Uploadimage("file", files))
            await uploadImg([...imgfile, { url: imgApi.filename, id: imgApi.id }])
            listId()
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImg = async (ar: any) => {
        debugger
        let length = ar?.length - 1
        let last = ar[length]
        let list = {}
        {
            checkCoverImg ?
                list = {
                    id: match?.params?.id,
                    publicData: {
                        cover_photo: checkCoverImg,
                        images: [...imgfile,
                        {
                            url: last?.url,
                            id: last?.id,
                            priority: ar?.length + 1,
                            caption: ""
                        }
                        ],
                        stepsCompleted: [
                            ...steps, 7
                        ]
                    }
                }
                :
                list = {
                    id: match?.params?.id,
                    publicData: {
                        cover_photo: {
                            url: last?.url,
                            id: last?.id,
                            priority: ar?.length,
                            caption: ""
                        },
                        stepsCompleted: [
                            ...steps, 7
                        ]
                    }
                }
        }
        try {
            await HenceForthApi?.Auth?.Updatedlisting(list)
            await listId()
        } catch (error) {
            console.log(error);
        }
    }

    const nextPage = async (ar: any) => {
        let list = {
            id: match?.params?.id,
            publicData: {
                cover_photo: checkCoverImg,
                images: [...imgfile]
            }
        }
        try {
            if (checkCoverImg) {
                setLoader(true)
                await HenceForthApi?.Auth?.Updatedlisting(list)
                setLoader(false)
                navigate(`/create-stall/step8/${match?.params?.id}`)
            } else {
                toast('🦄 Please Upload Images', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="progress" style={{ height: "8px" }}>
                <ToastContainer />
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "40%" }}>
                </div>
            </div>
            <div className="row mx-0 h-100">
                <div className="col-lg-6 py-5 steps-frame-height h-md-auto overflow-scroll" style={{ height: '91vh' }}>
                    <div className="col-md-11 col-lg-8 px-0 mx-auto">
                        <h3 className="heading-big">Add photos to your listing</h3>
                        <p className="font-small-bold mb-4">Upload at least one photo to publish your listing. We strongly suggest adding multiple photos to attract attention to your listing. Do not include images of your barn name or contact information.</p>
                        <div className="upload-container mb-5  border border-5 border-dark p-5 text-center border-dotted">
                            <div className="">
                                <img src={publisgImg} alt="" className="mb-2" />
                            </div>
                            <div className="">
                                <label
                                    className=""
                                    htmlFor="inputGroupFile01"
                                >
                                    <span className="text-white p-2 rounded-2" style={{ backgroundColor: "#00a4b4" }}>Upload Photo</span>
                                </label>
                                <input type="file" className="form-control d-none" id="inputGroupFile01" multiple onChange={(e: any) => fileSelectedHandler(e)} />
                            </div>
                        </div>
                        {
                            checkCoverImg &&
                            <div className="row">
                                <div className="col-md-6 images-gallery mb-4">
                                    <div className="cover-img">
                                        <div className="position-relative">
                                            <img src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${checkCoverImg?.url}`} alt="" className="rounded-1" style={{ width: "200px", height: "200px" }} />
                                            <span className="del-bg del-bg1 border">
                                                <img src={deleteImg} alt="" height="18px" />
                                            </span>
                                            <span className="del-bg del-bg2 border">
                                                <img src={editImg} alt="" height="18px" />
                                                <input type="file" className="d-none" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {Array.isArray(imgfile) && imgfile.length && imgfile.map((e: any, index: any) =>
                                    <div className="col-md-6 images-gallery mb-4">
                                        <div className="cover-img ">
                                            <div className="position-relative">
                                                <img src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${e?.url}`} alt="" className="rounded-1" style={{ width: "200px", height: "200px" }} />
                                                <span className="del-bg del-bg1 border">
                                                    <img src={deleteImg} alt="" height="18px" />
                                                </span>
                                                <span className="del-bg del-bg2 border">
                                                    <img src={editImg} height="18px" alt="" />
                                                    <input type="file" className="d-none" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                        <div className="d-flex justify-content-between mt-5 border-top">
                            <Link to="/create-stall/step6">
                                <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                    <img src={backArrow}
                                        alt=""
                                        className="pr-1" /> Back
                                </button>
                            </Link>
                            <button className="btn my-3 px-3 text-white" onClick={nextPage} style={{ background: "rgb(0, 164, 180)" }}> {!loader ? "Next" : "Loading....."}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-md-0 d-none d-lg-block">
                    <div className="h-100 d-flex align-items-center px-md-5 bg-light justify-content-start">
                        <div className="border col-md-7 px-4 py-4 mb-4 bg-white">
                            <img src={bulbImg} alt="" height="32px" className="mb-4" />
                            <h6 className="font-medium-bold">Quick tips for quality photos</h6>
                            <ul className="list-unstyled">
                                <li >
                                    <span >.</span> Use high quality photos to make your listing stand out</li>
                                <li >
                                    <span >.</span> Make sure you have good lighting</li>
                                <li >
                                    <span >.</span> Show off your listing</li>
                                <li ><span >.</span> Use recent and up to date pictures </li>
                                <li ><span >.</span> Add multiple photos to attract guests</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}