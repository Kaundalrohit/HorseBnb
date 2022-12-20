import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userImgIcon from '../Images/business-card.svg'
import HenceForthApi from '../Utils/HenceForthApi'

const PersonalInfo = () => {
    HenceForthApi.setToken(localStorage.getItem('token'))
    const [nameToggle, setNameToggle] = useState<boolean>(true)
    const [emailToggle, setEmailToggle] = useState<boolean>(true)
    const [locToggle, setLocToggle] = useState<boolean>(true)
    const [genderToggle, setGenderToggle] = useState<boolean>(true)
    const [birthToggle, setBirthToggle] = useState<boolean>(true)
    const [phoneToggle, setPhoneToggle] = useState<boolean>(true)
    const [aboutToggle, setAboutToggle] = useState<boolean>(true)
    const [langToggle, setLangToggle] = useState<boolean>(true)

    const [state, setState] = useState<any>({
        userImg: "",
        userName: "",
        userFirstName: "",
        userLastName: "",
        gender: "",
        age: "",
        userEmail: "",
        phone: "",
        about: "",
        address: "",
        language: ""

    })

    const handleState = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const getData = async () => {
        let res = (await HenceForthApi.Auth.getdata()).data
        setState({
            userImg: res?.attributes?.profile?.publicData?.profile_image,
            userName: res?.attributes?.profile?.displayName,
            userFirstName: res?.attributes?.profile?.firstName,
            userLastName: res?.attributes?.profile?.lastName,
            gender: res?.attributes?.profile?.publicData?.gender,
            age: res?.attributes?.profile?.publicData?.age,
            userEmail: res?.attributes?.email,
            phone: res?.attributes?.profile?.protectedData?.phoneNumber,
            about: res?.attributes?.profile?.bio,
            address: res?.attributes?.profile?.publicData?.address,
            language: res?.attributes?.profile?.publicData?.language,
        })
    }


    const updateName = async () => {
        let res = (await HenceForthApi.Auth.updateUserProfile({
            firstName: state.userFirstName,
            lastName: state.userLastName,
        }))

        getData()
    }
    const updateGender = async () => {
        let res = (await HenceForthApi.Auth.updateUserProfile({
            publicData: {
                gender: state.gender
            }
        }))

        getData()
    }
    const updateAge = async () => {
        let res = (await HenceForthApi.Auth.updateUserProfile({
            publicData: {
                age: state.age
            }
        }))

        getData()
    }
    const updatePhone = async () => {
        let res = (await HenceForthApi.Auth.updateUserProfile({
            protectedData: {
                phoneNumber: state.phone
            }
        }))

        getData()
    }
    const updateEmail = async () => {
        let res = (await HenceForthApi.Auth.updateUserProfile({
            email: state.userEmail
        }))

        getData()
    }
    const updateAbout = async () => {
        let res = (await HenceForthApi.Auth.updateUserProfile({

            bio: state.about

        }))

        getData()
    }
    const updateLang = async () => {
        let res = (await HenceForthApi.Auth.updateUserProfile({
            publicData: {
                language: state.language
            }
        }))
        getData()
    }

    useEffect(() => {
        getData()
    }, [])

    const isImage = (url: string): boolean => {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }


    const Languages = [
        { id: 1, language: "English" },
        { id: 2, language: "Hindi" },
        { id: 3, language: "Breton" },
        { id: 4, language: "Arabic" },
        { id: 5, language: "Italian" },
        { id: 6, language: "German" },
        { id: 7, language: "French" },
        { id: 8, language: "Thai" },
        { id: 9, language: "Armenian" },
        { id: 10, language: "Spanish" },
        { id: 11, language: "Russian" },
        { id: 12, language: "Portuguese" },
        { id: 13, language: "Urdu" },
        { id: 14, language: "Punjabi" },
    ]


    const handleSubmit = async (e: any) => {
        let file = e.target.files[0]
        try {
            // setLoader(true)
            let res = (await HenceForthApi.Auth.Uploadimage("file", file))
            await uploadImg(res.filename)
            await getData()
            // await list()
            // setLoader(false)
        } catch (error) {
            console.log(error);

        }

    }

    const uploadImg = async (url: string) => {
        const list = {
            publicData: {
                image: url,
                // stepsCompleted: [...steps, 9,]
            }
        }
        try {
            let res = (await HenceForthApi.Auth.updateUserProfile(list))
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className="container mt-4">
                <nav aria-label="breadcrumb mb-4">
                    <ol className="breadcrumb pl-0 mb-2">
                        <li className="breadcrumb-item">
                            <Link to="/account" className='text-decoration-none text-black'>Account</Link>
                        </li>
                        <li aria-current="page" className="breadcrumb-item active d-flex align-items-center justify-content-center"> Personal Info </li>
                    </ol>
                </nav>
                <h1 className="heading-large mt-0 mb-5 text-black line-height-space">Personal Info</h1>

                <div className="row justify-content-md-between">

                    <div className="col-md-4 col-lg-4">
                        <div className="border p-4 mb-4">
                            <div className="text-center">
                                <div className="book-img mx-auto mb-3 border position-relative">
                                    <div className="centered-spinner">
                                    </div>
                                    <img className="obj-cover  ng-lazyloaded" alt='' src={state.userImg ? isImage(state.userImg)
                                        ?
                                        `${HenceForthApi.API_FILE_ROOT_SMALL}${state.userImg}`
                                        :
                                        state.userImg
                                        : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                                    } />
                                </div>
                                <input type="file" id="userImageInput" onChange={handleSubmit} accept=".png, .jpg, .jpeg, .pdf" className="form-control d-none" />
                                <button className="btn btn-primary mt-2 btn-round px-4">
                                    <label htmlFor="userImageInput" className="m-0 cursor-pointer">Upload</label>
                                </button>
                            </div>
                        </div>
                        <div className="border px-4 py-4 mb-4">
                            <img src={userImgIcon} alt='' height="32px" className="mb-4" />
                            <h6 className="font-medium-bold text-black">What info is shared with others?</h6>
                            <p >HorseBnB only release contact information for hosts and guests after a reservation is confirmed.</p>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-8">

                        {/* <............User Name.................> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">Legal Name</p>
                                </div>
                                {nameToggle ? < button className='border-0 btn' onClick={() => {
                                    setNameToggle(false)
                                }} >Update</button>
                                    : <button className='border-0 btn' onClick={() => {
                                        setNameToggle(true)
                                    }} >Cancel</button>}
                            </div>

                            {!nameToggle && <div className="">
                                <div >
                                    <span className="ng-star-inserted">This is the name on your travel document, which could be a licence or a passport.</span>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="firstname" className="fw-600">First Name</label>
                                    <input placeholder="First Name" value={state.userFirstName}
                                        onChange={handleState}
                                        name="userFirstName"
                                        className="form-control ng-untouched ng-pristine ng-valid" />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastname" className="fw-600">Last Name</label>
                                    <input placeholder="Last Name" value={state.userLastName}
                                        onChange={handleState}
                                        name="userLastName"
                                        className="form-control ng-untouched ng-pristine ng-valid" />
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"
                                        onClick={updateName}> Save </button>
                                </div>
                            </div>}
                            {nameToggle && <p>{state.userName}</p>}
                        </div>

                        {/* <.............Gender...................> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">Gender</p>
                                </div>
                                {genderToggle ? < button className='border-0 btn' onClick={() => {
                                    setGenderToggle(false)
                                }} >Update</button>
                                    : <button className='border-0 btn' onClick={() => {
                                        setGenderToggle(true)
                                    }} >Cancel</button>}
                            </div>

                            {!genderToggle && <div className="">
                                <select className="form-select" onClick={handleState} name="gender" aria-label="Default select example">
                                    <option >Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center" onClick={updateGender}> Save </button>
                                </div>
                            </div>}
                            {genderToggle && <p>{state.gender}</p>}
                        </div>

                        {/* <.............Date of birth...................> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">Date of Birth</p>
                                </div>
                                {birthToggle ? < button className='border-0 btn' onClick={() => {
                                    setBirthToggle(false)
                                }}>Update</button>
                                    : <button className='border-0 btn' onClick={() => {
                                        setBirthToggle(true)
                                    }} >Cancel</button>}
                            </div>

                            {!birthToggle && <div className="">
                                <div className="">
                                    <input type="date" name="age" onChange={handleState} className='form-control' />
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"
                                        onClick={updateAge}> Save </button>
                                </div>
                            </div>}
                            {birthToggle && <p>{state.age}</p>}
                        </div>


                        {/* <.............Email.............> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">Email</p>
                                    <p>{state.userEmail}</p>

                                </div>
                                <div className="">
                                    <button className='btn border-0'>Verify</button>
                                    {emailToggle ? < button className='border-0 btn' onClick={() => {
                                        setEmailToggle(false)
                                    }}>Update</button>
                                        : <button className='border-0 btn' onClick={() => {
                                            setEmailToggle(true)
                                        }} >Cancel</button>}
                                </div>
                            </div>

                            {!emailToggle && <div className="">
                                <div className="">
                                    <input type="email" value={state.userEmail} name="userEmail" onChange={handleState} className='form-control' />
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"
                                        onClick={updateEmail}> Save </button>
                                </div>
                            </div>}
                        </div>

                        {/* <.............Phone.............> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">Phone</p>


                                </div>
                                <div className="">
                                    {phoneToggle ? < button className='border-0 btn' onClick={() => {
                                        setPhoneToggle(false)
                                    }}>Update</button>
                                        : <button className='border-0 btn' onClick={() => {
                                            setPhoneToggle(true)
                                        }} >Cancel</button>}
                                </div>
                            </div>

                            {!phoneToggle && <div className="">
                                <div className="">
                                    <p>For notifications, reminders, and help logging in</p>
                                    <input type="number" name="phone" onChange={handleState} className='form-control' />
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"
                                        onClick={updatePhone}> Save </button>
                                </div>
                            </div>}
                            {phoneToggle && <p>{state.phone}</p>}
                        </div>
                        {/* <.............About.............> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">About</p>


                                </div>
                                <div className="">
                                    {aboutToggle ? < button className='border-0 btn' onClick={() => {
                                        setAboutToggle(false)
                                    }}>Update</button>
                                        : <button className='border-0 btn' onClick={() => {
                                            setAboutToggle(true)
                                        }} >Cancel</button>}
                                </div>
                            </div>

                            {!aboutToggle && <div className="">
                                <div className="">

                                    <textarea className='form-control' value={state.about} name="about" onChange={handleState}></textarea>
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center" onClick={updateAbout}> Save </button>
                                </div>
                            </div>}
                            {aboutToggle && <p>{state.about}</p>}
                        </div>
                        {/* <.............Location.............> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">Address</p>
                                </div>
                                <div className="">
                                    {locToggle ? < button className='border-0 btn' onClick={() => {
                                        setLocToggle(false)
                                    }}>Update</button>
                                        : <button className='border-0 btn' onClick={() => {
                                            setLocToggle(true)
                                        }} >Cancel</button>}
                                </div>
                            </div>

                            {!locToggle && <div className="">
                                <div className="">
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"> Save </button>
                                </div>
                            </div>}
                            {/* {locToggle && <p>{state.address}</p>} */}
                        </div>
                        {/* <.............Language.............> */}
                        <div className="border px-4 py-3 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div >
                                    <p className="fw-600 text-black mt-0">Language</p>
                                </div>
                                <div className="">
                                    {langToggle ? < button className='border-0 btn' onClick={() => {
                                        setLangToggle(false)
                                    }} >Update</button>
                                        : <button className='border-0 btn' onClick={() => {
                                            setLangToggle(true)
                                        }} >Cancel</button>}
                                </div>
                            </div>
                            {!langToggle && <div className="">
                                <div className="">
                                    <select className="form-select" value={state.language} name="language" onChange={handleState} aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        {Languages.map((e: any) =>
                                            <option value={e.language}>{e.language}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center" onClick={updateLang}> Save </button>
                                </div>
                            </div>}
                            {langToggle && <p>{state.language}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PersonalInfo