import Modal from "./Modal/Modal";
import { useState } from "react";
import UserNav from "./UserNav";
import Logo from "../../Images/Logo.png"


export default function Navbar() {

  const [modal, setModal] = useState<boolean>(true);

  const [showNav, setShowNav] = useState<string | null>(localStorage.getItem('token'));

  const loginModal = () => {
    setModal(true)
  }
  const signModal = () => {
    setModal(false)
  }

  const updateToken = (token: string) => {
    setShowNav(token)
  }

  return (
    <>
      <nav className="navbar bg-light navbar-expand-lg shadow bg-white p-3">
        <div className="container-fluid">
          <a className="navbar-brand " href="/">
            <img src={Logo} alt="" />
          </a>

          {/* <.....................TOGGLE NAVBAR .........................> */}

          {showNav !== null ? <UserNav setShowNav={updateToken} />
            : <div className="d-flex">
              <button className="btn  border-0" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={loginModal}>Log In</button>
              <button
                className="btn text-white ms-2"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                style={{ backgroundColor: "#00a4b4", border: "#00a4b4" }}
                onClick={signModal}
              >
                Sign Up
              </button>
            </div>
          }
        </div>

        {/* <.......................LOG IN / SIGN UP MODAL...........................> */}

        <Modal modal={modal} loginModal={loginModal} signModal={signModal} handleToken={updateToken} />

      </nav >
    </>
  );
}
