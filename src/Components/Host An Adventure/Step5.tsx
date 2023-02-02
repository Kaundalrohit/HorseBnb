import { stat } from "fs";
import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import backArrow from '../Images/chevron-left-primary.svg'
import deleteImg from '../Images/delete-24px.svg'
import editImg from '../Images/edit.png'
import publisgImg from '../Images/publish.svg'
import bulbImg from '../Images/lightbulb.svg'
import Spinner from "../Spinner/Spinner";

type props = {
    steps: any
    setsteps: any;
    value: number
}

const Step5 = (props: props) => {
    const { steps: steps, setsteps, value } = props

    const navigate = useNavigate()

    HenceForthApi.setToken(localStorage.getItem('token'));

    const match = useMatch('/add-experience/step5/:id');

    const [checkCoverImage, setcheckCoverImage] = useState<any>({})
    const [imgFile, setImgFile] = useState<any>([])
    const [loader, setLoader] = useState<boolean>(false)



    const fileSelectedHandler = async (e: any) => {

        let files = e.target.files[0];

        try {
            let res = await HenceForthApi.Auth.Uploadimage('file', files)

            await uploadImg([...imgFile, { url: res.filename, id: res.id }])
            list()
        }
        catch (error) {
            console.log(error);

        }

    }

    const uploadImg = async (ar: any) => {
        // debugger
        let length = ar?.length - 1
        let last = ar[length]
        let list = {}
        {
            checkCoverImage ?
                (list = {
                    id: match?.params.id,
                    publicData: {
                        cover_photo: checkCoverImage,
                        images: [...imgFile,
                        {
                            caption: "",
                            id: last?.id,
                            priority: ar?.length + 1,
                            url: last?.url
                        }
                        ],
                        stepsCompleted: [
                            ...steps,
                            5
                        ]
                    }
                })
                :
                (list = {
                    id: match?.params.id,
                    publicData: {
                        cover_photo: {
                            caption: "",
                            id: last?.id,
                            priority: ar?.length,
                            url: last?.url
                        },
                        stepsCompleted: [
                            ...steps,
                            5
                        ]
                    }
                })
        }
        try {
            let res = await HenceForthApi.Auth.Updatedlisting(list)
        }
        catch (error) {
            console.log(error);

        }

    }


    const nextPage = async (navigation: string) => {
        let list = {
            id: match?.params?.id,
            publicData: {
                cover_photo: checkCoverImage,
                images: [...imgFile]
            }
        }
        try {
            if (checkCoverImage) {
                setLoader(true)
                await HenceForthApi?.Auth?.Updatedlisting(list)
                setLoader(false)
                {
                    navigation === 'Next' ?
                        navigate(`/add-experience/step6/${match?.params.id}`)
                        :
                        navigate(`/add-experience/last-step/${match?.params.id}`)
                }
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

    const list = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params.id)
            setcheckCoverImage(res.data.attributes.publicData.cover_photo);
            setImgFile(res.data.attributes.publicData.images)
            setsteps(res.data.attributes.publicData.stepsCompleted)

        }
        catch (error) {

        }
    }

    useEffect(() => {
        list()
    }, [])

    useEffect(() => {
        { value && nextPage('Last') }
    }, [value])


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
                            checkCoverImage &&
                            <div className="row">
                                <div className="col-md-6 images-gallery mb-4">
                                    <div className="cover-img">
                                        <div className="position-relative">
                                            <img src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${checkCoverImage?.url}`} alt="" className="rounded-1" style={{ width: "200px", height: "200px" }} />
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
                                {Array.isArray(imgFile) && imgFile.length && imgFile.map((l: any, index: any) =>
                                    <div className="col-md-6 images-gallery mb-4">
                                        <div className="cover-img ">
                                            <div className="position-relative">
                                                <img src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${l?.url}`} alt="" className="rounded-1" style={{ width: "200px", height: "200px" }} />
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
                            <Link to="">
                                <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                    <img src={backArrow}
                                        alt=""
                                        className="pr-1" /> Back
                                </button>
                            </Link>
                            {/* <Link to={`/add-experience/step6/${match?.params.id}`}> */}
                            <button className="btn my-3 px-3 text-white"
                                onClick={() => nextPage('Next')}
                                style={{ background: "rgb(0, 164, 180)" }}
                                disabled={loader}
                            > {!loader ? "Next" : <Spinner />}
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-md-0 d-none d-lg-block">
                </div>
            </div>
        </>
    )
}
export default Step5