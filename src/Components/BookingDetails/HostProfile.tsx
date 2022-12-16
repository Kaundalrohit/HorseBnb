import { useEffect, useState } from "react"
import { Link, useMatch } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"
import star from '../Images/star-red.svg'
import checkCircleImg from '../Images/check-circle-primary.svg'
// import errorImg from '../Images/error.png'


const HostProfile = () => {
    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch(`/profile/:id`)
    let id = match?.params?.id

    const [userProfile, setUserProfile] = useState<any>({
        userName: "",
        userEmail: "",
        userJoiningData: "",
        userImg: "",
        userListing: [],
        verifiedImg: false
    })

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                let res = (await HenceForthApi.Auth.hostProfile(id))
                console.log(res);
                setUserProfile({
                    ...userProfile,
                    userName: res?.user?.displayName,
                    userEmail: res?.user?.email,
                    userJoiningData: res?.user?.createdAt,
                    userImg: res?.user?.profile_image,
                    verifiedImg: res?.user?.emailVerified,
                    userListing: res?.listings
                })
            } catch (error) {
                console.log(error);
            }
        }
        getUserProfile()
    }, [])

    const isImage = (url: string): boolean => {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }


    return (
        <>
            <div className="" >
                {/* {id} */}
                <div className="container my-5">
                    <div className="row m-0">
                        <div className="col-md-3">
                            <div className="border p-4">
                                <div className="border-bottom text-center pb-4">
                                    <div className="book-img mx-auto mb-3">
                                        <img className="obj-cover ng-star-inserted"
                                            src={
                                                isImage(userProfile.userImg)
                                                    ?
                                                    `${HenceForthApi.API_FILE_ROOT_SMALL}${userProfile.userImg}`
                                                    :
                                                    userProfile.userImg
                                            }
                                        />
                                    </div>
                                    <h4 className="font-medium-bold mb-3">{userProfile.userName}</h4>
                                </div >
                                <div className="py-4" >
                                    {userProfile?.verifiedImg ? <p className="font-medium d-flex ng-star-inserted" >
                                        <div className="me-1">
                                            <img src={checkCircleImg} width={20} className="me-2" />
                                        </div>
                                        <span className="fw-bold">
                                            Email Confirmed
                                        </span>
                                    </p > : ""}
                                </div >
                            </div >
                        </div >
                        <div className="col-md-9" >
                            <div className="border p-4" >
                                <div >
                                    <h2 className="heading-profile">Hi, I'm {userProfile.userName}</h2>
                                    <p className="font-20" >
                                        Joined on {new Date(userProfile.userJoiningData).toLocaleDateString()}
                                    </p >
                                </div >
                            </div >
                            <div className="col-lg-12 p-0" >
                                <div className="rightcol-name-detail" >
                                    <div className="d-flex justify-content-between align-items-center mt-4" >
                                        <h3 className="mt-0 ng-star-inserted" > {userProfile.userName}'s Listings </h3>
                                    </div>
                                </div>
                                <div className="rightcol-image">
                                    <div className="rightcol-image-detail">
                                        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">

                                            {userProfile?.userListing?.map((e: any, index: any) =>
                                                <div className="col py-3 ng-star-inserted" key={index}>
                                                    <Link to={`/booking-details/${e?.id}?listing=${e.id}`} className="text-decoration-none text-black" >
                                                        <div className="">
                                                            <div className="image-detail">
                                                                <img alt="" className="obj-cover" src={`${HenceForthApi.API_FILE_ROOT_SMALL}${e?.cover_photo}`} />
                                                            </div>
                                                            <div className="image-about">
                                                                <div className="image-content"><div className="row m-0">
                                                                    <div className="image-content mt-2">
                                                                        <div className="text-turncate three-line-ellipsis ng-star-inserted" style={{ fontWeight: "700" }}>{e?.type}</div>
                                                                    </div>
                                                                    <div className="col-12 p-0 d-flex mt-2">
                                                                        <div className="image-about-detail flex-grow-1 pr-2">
                                                                            <h6 >{e?.title}</h6>
                                                                        </div>
                                                                        <div className="starimg">
                                                                            <img src={star} alt="" />
                                                                            <span >{e?.rating}</span>
                                                                        </div>
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
                                    <div className="rightcol-review">
                                        <div className="review my-3">
                                            <h4 > {userProfile.userName}'s Reviews </h4 >
                                        </div >
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </>
    )

}
export default HostProfile