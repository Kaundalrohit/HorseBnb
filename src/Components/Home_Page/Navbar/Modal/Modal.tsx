import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Facebook from '../../../LogIn/Facebook'
import GoogleSdk from '../../../LogIn/GoogleSdk'
import HenceForthApi from "../../../Utils/HenceForthApi"
type Function = () => void
type props = {
    modal: boolean,
    loginModal: Function
    signModal: Function
    handleToken: (token: string) => void,
}

export default function Modal({ modal, signModal, loginModal, handleToken }: props) {

    // <................STATES DECLARATION.................>

    const [userNum, setUserNum] = useState<string>('')
    const [countryCode, setCountrycode] = useState<string>('')

    const [user, setUser] = useState<any>({
        userEmail: "",
        userPass: "",
        firstName: "",
        phoneValue: "",
        lastName: "",
        vikram: {
            lastname: ''
        },
        email: "",
        password: "",
    })

    const { userEmail, userPass, firstName, phoneValue, lastName, email, password } = user

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // <................CREATE NEW USER ...................>
    const createUser = async (e: any) => {
        e.preventDefault()
        try {
            let res = (await HenceForthApi.Auth.signup({
                deviceId: "string",
                deviceType: 3,
                email: email,
                fcmId: "string",
                firstName: firstName,
                lastName: lastName,
                password: password,
                protectedData: {
                    phoneNumber: userNum
                },
                publicData: {
                    country_code: '+' + countryCode
                }
            }))
            localStorage.setItem("token", res.data.token)
            handleToken(res.data.token);

        } catch (error) {
            console.log(error);

        }
    }

    // <................USER LogIn.........................>

    const userLogIn = async (e: any) => {
        e.preventDefault()
        try {
            let res = (await HenceForthApi.Auth.login({
                username: userEmail,
                password: userPass,
                deviceId: "string",
                deviceType: 3,
                fcmId: "string"
            }))
            localStorage.setItem("token", res.data.token)
            handleToken(res.data.token);

        } catch (error) {
            console.log(error);

        }
    }


    const handleOnChange = (phone: any, data: any) => {

        let num = phone.slice(data.dialCode.length, phone.length)
        setUserNum(num)
        let code = data.dialCode
        setCountrycode(code)
        // setUser({
        //     ...user,
        //     phoneValue: `${data.dialCode}${phone.slice(data.dialCode.length, phone.length)}`
        // })
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="border-bottom border-2">
                            <div className="row d-flex px-3 py-2">
                                <div className="col-7 text-end">
                                    {modal ? <h4 className="font-medium-bold">Log In</h4>
                                        :
                                        <h4 className="font-medium-bold" >Sign Up</h4>}
                                </div>
                                <div className="col-5 text-end pt-1">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body px-2 pb-0 px-md-5">
                            {modal ?
                                <form onSubmit={userLogIn} className="ng-untouched ng-pristine ng-invalid">
                                    <div className="form-group mb-2">
                                        <input type="email" value={userEmail} name="userEmail" onChange={handleChange} placeholder="Email Address" className="form-control" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <input type="password" value={userPass} name="userPass" onChange={handleChange} placeholder="Password" className="form-control" />
                                    </div>
                                    <div className="mb-4 d-flex justify-content-between">
                                        <div className="form-check d-flex align-items-center p-0">
                                            <div className="d-flex col-12 p-0">
                                                <label htmlFor="Remember" className="tickbox my-0 text-default d-flex align-items-center position-relative">
                                                    <input type="checkbox" id="Remember" />
                                                    <span className="checkmark"></span>
                                                </label>
                                                <span className="ms-2"> Remember Me</span>
                                            </div>
                                        </div>
                                        <button className="pointer border-0 bg-white font-small" style={{ color: "#00a4b4" }}>Forgot Password?</button>
                                    </div>
                                    <button type="submit" className="btn close btn-block  text-light fw-bold w-100 position-relative d-flex align-items-center justify-content-center" data-bs-dismiss="modal" style={{ backgroundColor: "#00a4b4" }}> Log In</button>
                                </form>
                                : <form onSubmit={createUser} className="ng-untouched ng-pristine ng-invalid">
                                    <div className="form-group mb-3">
                                        <input type="text" value={firstName} name="firstName" onChange={handleChange} placeholder="First Name" className="form-control" />
                                    </div>
                                    <div className="form-group mb-2 mb-3">
                                        <input type="text" value={lastName} name="lastName" onChange={handleChange} placeholder="Last Name" className="form-control" />
                                    </div>
                                    <PhoneInput
                                        country={'in'}
                                        value={phoneValue}
                                        onChange={handleOnChange}
                                    />
                                    < div className="form-group mb-2 my-3">
                                        <input type="email"
                                            value={email} name="email" onChange={handleChange} placeholder="Enter Email" className="form-control" />
                                    </div>
                                    <div className="form-group mb-2 mb-3">
                                        <input type="password" placeholder="Password" className="form-control" />
                                    </div>
                                    <div className="form-group mb-2 mb-3">
                                        <input type="password" value={password} name='password' onChange={handleChange} placeholder="Confirm Password" className="form-control" />
                                    </div>
                                    <div className="d-flex col-12 p-0 mb-2">
                                        <label className="tickbox my-0 text-default d-flex align-items-center position-relative">
                                            <input type="checkbox" id="Check1" className="me-2" />
                                            <span className="checkmark"></span>
                                        </label> Agree to &nbsp;<button className="text-primary border-0 bg-white text-decoration-underline pointer">
                                            <span style={{ color: "#00a4b4" }}> Terms &amp; Conditions</span></button>
                                    </div>
                                    <button type="submit" className="btn btn-block text-light fw-bold  w-100 position-relative d-flex align-items-center justify-content-center" style={{ backgroundColor: "#00a4b4" }}>Sign Up</button>
                                </form>}

                            <div className="d-flex flex-column text-center">
                                <label className="continue-label py-4 m-0"> Or continue with </label>
                            </div>
                        </div>
                        <div className="custmodal-footer pt-0 pb-4">
                            <div className="facebook px-5 ">
                                <div className="border border-dark rounded-2 ">
                                    <button type="button" className="btn btn-lg  w-100">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <i className="bi bi-facebook text-primary"></i>
                                            <div className="m-auto button-font">
                                                <span >   <Facebook handleToken={handleToken} /></span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="facebook px-5 mt-2 ">
                                <div className="border border-dark rounded-2 ">
                                    <button type="button" className="btn btn-lg  w-100">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <i className="bi bi-google text-primary"></i>
                                            <div className="m-auto button-font">
                                                <span > <GoogleSdk handleToken={handleToken} /> </span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {modal ? <div className="">
                                <p className="mb-0 mt-4 font-small text-center">Don’t have an HorseBnB account ? <button className=" pointer  border-0 bg-white text-decoration-underline" onClick={() => {
                                    signModal();
                                }} style={{ color: "#00a4b4" }}>Sign Up</button>
                                </p>
                            </div>
                                : <div className="">
                                    <p className="mb-0 mt-4 font-small text-center">Already have an HorseBnB account ? <button className=" pointer  border-0 bg-white text-decoration-underline" onClick={() => {
                                        loginModal();
                                    }} style={{ color: "#00a4b4" }}>Log In</button></p>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}