import { useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import HenceForthApi from "../Utils/HenceForthApi"
import backArrow from '../Images/chevron-left-primary.svg'
import deleteImg from '../Images/delete-24px.svg'
import editImg from '../Images/edit.png'
import publisgImg from '../Images/publish.svg'
import bulbImg from '../Images/lightbulb.svg'
import Spinner from "../Spinner/Spinner"


type props = {
    setSteps: any,
    steps: Array<number>
    value: number
}

const GuestStep7 = (props: props) => {

    const { steps, setSteps, value } = props

    const navigate = useNavigate()
    const match = useMatch(`/create-guest/Step7/:id`)

    const [loader, setLoader] = useState<boolean>(false)
    const [checkCoverImg, setCheckCoverImg] = useState<any>({
        caption: null,
        id: '',
        priority: 0,
        url: ""
    })

    const [imgfile, setImgFile] = useState<Array<any>>([])

    const listId = async () => {
        try {
            let res = await HenceForthApi.Auth.Listid(match?.params?.id)
            setCheckCoverImg(res?.data?.attributes?.publicData?.cover_photo);
            setImgFile(res?.data?.attributes?.publicData?.images)
            setSteps(res?.data?.attributes?.publicData?.stepsCompleted);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let files = e.target.files[0];
        try {
            let imgApi = (await HenceForthApi.Auth.Uploadimage("file", files))
            await uploadImg([...imgfile, { url: imgApi.filename, id: imgApi.id }])
            listId()
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImg = async (ar: any) => {
        let length = ar?.length - 1
        let last = ar[length]
        let list = {}
        {
            checkCoverImg?.url ?
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
                    }
                } : list = {
                    id: match?.params?.id,
                    publicData: {
                        cover_photo: {
                            url: last?.url,
                            id: last?.id,
                            priority: ar?.length,
                            caption: ""
                        },
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

    const nextPage = async (navigation: string) => {
        let list = {
            id: match?.params?.id,
            publicData: {
                cover_photo: checkCoverImg,
                images: [...imgfile],
                stepsCompleted: [...steps, 7],
            }
        }
        if (checkCoverImg) {
            setLoader(true)
            try {
                await HenceForthApi?.Auth?.Updatedlisting(list)
                setLoader(false)
                navigation === 'Next' ?
                    navigate(`/create-guest/step8/${match?.params?.id
                        }`)
                    :
                    navigate(`/create-guest/last-step/${match?.params?.id
                        }`)
            } catch (error) {
                console.log(error);
            }
        } else {
            toast('Upload Cover Photo', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }

    useEffect(() => {
        listId()
        // eslint-disable-next-line 
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
                        <div className="upload-container mb-5  border border-3 border-dark p-5 text-center" style={{ borderStyle: "dashed" }}>
                            <div className="">
                                <img src={publisgImg} alt="" className="mb-2" />
                            </div>
                            <div className="">
                                <label
                                    className=""
                                    htmlFor="inputGroupFile01"
                                >
                                    <span className="text-white p-2 rounded-2" style={{ backgroundColor: "#00A4B4" }}>Upload Photo</span>
                                </label>
                                <input type="file" className="form-control d-none" id="inputGroupFile01" multiple onChange={(e: any) => handleSubmit(e)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 images-gallery mb-4">
                                <div className="cover-img">
                                    {checkCoverImg ? (<div className="position-relative">
                                        <img src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${checkCoverImg?.url}`} alt="" className="rounded-1" style={{ width: "200px", height: "200px" }} />
                                        <span className="del-bg del-bg1 border">
                                            <img alt="" src={deleteImg} height="18px" />
                                        </span>
                                        <span className="del-bg del-bg2 border">
                                            <img alt="" src={editImg} height="18px" />
                                            <input type="file" className="d-none" />
                                        </span>
                                    </div>) : ""}
                                </div>
                            </div>
                            {Array.isArray(imgfile) && imgfile.map((l: any, index: any) =>
                                <div className="col-md-6 images-gallery mb-4" key={index}>
                                    <div className="cover-img ">
                                        <div className="position-relative">
                                            <img alt='' src={`${HenceForthApi.API_FILE_ROOT_MEDIUM}${l?.url}`} className="rounded-1" style={{ width: "200px", height: "200px" }} />
                                            <span className="del-bg del-bg1 border">
                                                <img alt="" src={deleteImg} height="18px" />
                                            </span>
                                            <span className="del-bg del-bg2 border">
                                                <img alt="" src={editImg} height="18px" />
                                                <input type="file" className="d-none" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex justify-content-between mt-5 border-top">
                            <Link to="/create-stall/step6">
                                <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                    <img src={backArrow}
                                        alt=""
                                        className="pr-1" /> Back
                                </button>
                            </Link>

                            <button className="btn my-3 px-3 text-white" style={{ background: "rgb(0, 164, 180)" }} onClick={() => nextPage('Next')}
                                disabled={loader}
                            > {!loader ? "Next" : <Spinner />}
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
export default GuestStep7