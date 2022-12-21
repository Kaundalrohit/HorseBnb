import Footer from "./Home_Page/Footer/Footer";
import Navbar from "./Home_Page/Navbar/Navbar";
import { Outlet } from 'react-router-dom'
import { Fragment } from "react";
type props = {
  saveExit: (value: number) => void
}

export default function Components({ saveExit }: props) {

  return <Fragment>
    <Navbar saveExit={saveExit} />
    <Outlet />
    <Footer />
  </Fragment>

}

