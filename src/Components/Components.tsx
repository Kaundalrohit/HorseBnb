import Footer from "./Home_Page/Footer/Footer";
import Navbar from "./Home_Page/Navbar/Navbar";
import { Outlet } from 'react-router-dom'
import { Fragment } from "react";

export default function Components() {

  return <Fragment>
    <Navbar />
    <Outlet />
    <Footer />
  </Fragment>

}

