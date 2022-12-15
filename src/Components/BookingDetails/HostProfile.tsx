import { useEffect, useState } from "react"
import { useMatch } from "react-router-dom"
import HenceForthApi from "../Utils/HenceForthApi"

const HostProfile = () => {
    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch(`/profile/:id`)
    let id = match?.params?.id
    const [userProfile, setUserProfile] = useState<any>({
        userName: "",
        userEmail: "",
        userJoiningData: "",
        userImg: "",
        userListing: []

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
                    userListing: res?.listings
                })
            } catch (error) {
                console.log(error);
            }
        }
        getUserProfile()
    }, [])

    console.log(userProfile.userListings);


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
                                        <img className="obj-cover ng-star-inserted" src={`${HenceForthApi.API_FILE_ROOT_SMALL}${userProfile.userImg}`} />
                                    </div>
                                    <h4 className="font-medium-bold mb-3">{userProfile.userName}</h4>
                                </div >
                                <div className="py-4" >
                                    <p className="font-medium d-flex ng-star-inserted" >
                                        <img src="../../../assets/img/check-outline-green.svg" className="pr-2" />
                                        {userProfile.userEmail} </p >
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
                                            <div className="col py-3 ng-star-inserted">
                                                <div className="image-detail">
                                                    <img alt="" className="obj-cover" src="https://horsebnb.s3.us-east-2.amazonaws.com/Uploads/Images/Medium/1670964486783-20200923_175415.jpg" />
                                                </div>
                                                <div className="image-about">
                                                    <div className="image-content"><div className="row m-0">
                                                        <div className="image-content mt-2">
                                                            <div className="text-turncate three-line-ellipsis ng-star-inserted" style={{ fontWeight: "700" }}>Short Term Stall</div>
                                                        </div>
                                                        <div className="col-12 p-0 d-flex mt-2">
                                                            <div className="image-about-detail flex-grow-1 pr-2">
                                                                <h6 >Quiet, private facility near Mn Lakes Country</h6>
                                                            </div>
                                                            <div className="starimg">
                                                                <img src="./../../../assets/img/profile/grade-24px.png" alt="" />
                                                                <span >0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
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