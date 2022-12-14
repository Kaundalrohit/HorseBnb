import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Components from "./Components/Components";
import Listing from "./Components/Home_Page/Listing/Listing";
import Hoststalls from "./Components/Host Your Stalls/HostStalls";
import Stall1 from "./Components/Host Your Stalls/Stall1";
import Stall3 from "./Components/Host Your Stalls/Stall3";
import Stalls5 from "./Components/Host Your Stalls/Stalls5";
import Stalls6 from "./Components/Host Your Stalls/Stalls6";
import Stall7 from "./Components/Host Your Stalls/Stalls7";
import Stalls8 from "./Components/Host Your Stalls/Stalls8";
import CheckInCheckOut from "./Components/Host Your Stalls/CheckInCheckOut";
import SuccessfullHosting from "./Components/Host Your Stalls/Successfulhosting";
import Stalls11 from "./Components/Host Your Stalls/Stalls11";
import Stalls12 from "./Components/Host Your Stalls/Stalls12";
import Stalls13 from "./Components/Host Your Stalls/Stalls13";
import LastStep from "./Components/Host Your Stalls/LastStep";
import Publish from "./Components/Host Your Stalls/Publish";
import AdventureStalls from "./Components/Host An Adventure/AdventureStalls";
import Step1 from "./Components/Host An Adventure/Step1";
import Step2 from "./Components/Host An Adventure/Step2";
import Step4 from "./Components/Host An Adventure/Step4";
import Step5 from "./Components/Host An Adventure/Step5";
import Step6 from "./Components/Host An Adventure/Step6";
import Step8 from "./Components/Host An Adventure/Step8";
import Step9 from "./Components/Host An Adventure/Step9";
import AdLastStep from "./Components/Host An Adventure/AdLastStep";
import HostGuests from "./Components/Host Guests/HostGuests";
import GuestStep1 from "./Components/Host Guests/GuestStep1";
import GuestStep3 from "./Components/Host Guests/GuestStep3";
import GuestStep5 from "./Components/Host Guests/GuestStep5";
import GuestStep6 from "./Components/Host Guests/GuestStep6";
import GuestStep7 from "./Components/Host Guests/GuestStep7";
import GuestStep8 from "./Components/Host Guests/GuestStep8";
import GuestStep9 from "./Components/Host Guests/GuestStep9";
import GuestCheckIn from "./Components/Host Guests/GuestCheckIn";
import GuestStep10 from "./Components/Host Guests/GuestStep10";
import GuestStep11 from "./Components/Host Guests/GuestStep11";
import GuestStep12 from "./Components/Host Guests/GuestStep12";
import GuestStep13 from "./Components/Host Guests/GuestStep13";
import GuestsLastStep from "./Components/Host Guests/GuestsLastStep";
import ShowALlDetails from "./Components/ShowAllDetails/ShowAllDetails";
import BookingDetails from "./Components/BookingDetails/BookingDetails";
import AboutUs from "./Components/ImformationPages/AboutUs";
import PublishedData from "./Components/PublistedData/PublishedData";
import { useState } from "react";
import Account from "./Components/UserAccount/Account";
import PersonalInfo from "./Components/UserAccount/PersonalInfo";
import UpdatePassword from "./Components/UserAccount/UpdatePassword";
import Payments from "./Components/UserAccount/Payments";
import Stalls9 from "./Components/Host Your Stalls/Stalls9";


function App() {



  const [steps, setSteps] = useState<any>([])
  const [adSteps, setAdSteps] = useState<any>([])
  console.log(steps);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Components />}>
            <Route index element={<Listing />} />

            {/* <.....................................> */}

            <Route path="host-stalls" element={<Hoststalls />} />
            <Route path="create-stall/step1" element={<Stall1 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step3/:id" element={<Stall3 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step5/:id" element={<Stalls5 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step6/:id" element={<Stalls6 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step7/:id" element={<Stall7 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step8/:id" element={<Stalls8 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step9/:id" element={<Stalls9 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/checkin-and-checkout/:id" element={<CheckInCheckOut setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/sucessfull-hosting/:id" element={<SuccessfullHosting setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step11/:id" element={<Stalls11 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step12/:id" element={<Stalls12 setSteps={setSteps} steps={steps} />} />
            <Route path="create-stall/step13/:id" element={<Stalls13 />} />
            <Route path="create-stall/last-step/:id" element={<LastStep />} />

            {/* <.....................................> */}


            <Route path="host-guests" element={<HostGuests />} />
            <Route path="create-guest/step1" element={<GuestStep1 steps={steps} />} />
            <Route path="create-guest/step3/:id" element={<GuestStep3 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step5/:id" element={<GuestStep5 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step6/:id" element={<GuestStep6 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step7/:id" element={<GuestStep7 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step8/:id" element={<GuestStep8 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step9/:id" element={<GuestStep9 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/checkin-and-checkout/:id" element={<GuestCheckIn steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/sucessfull-hosting/:id" element={<GuestStep10 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step11/:id" element={<GuestStep11 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step12/:id" element={<GuestStep12 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/step13/:id" element={<GuestStep13 steps={steps} setSteps={setSteps} />} />
            <Route path="create-guest/last-step/:id" element={<GuestsLastStep steps={steps} setSteps={setSteps} />} />
            {/* <Route path="create-guest/publish-listing/:id" element={<GuestPublish />} /> */}


            {/* <.....................................> */}

            <Route path="host-an-experience" element={<AdventureStalls />} />
            <Route path="add-experience/step1/" element={<Step1 adSteps={adSteps} />} />
            <Route path="add-experience/step2/:id" element={<Step2 adSteps={adSteps} setAdSteps={setAdSteps} />} />
            <Route path="add-experience/step4/:id" element={<Step4 adSteps={adSteps} setAdSteps={setAdSteps} />} />
            <Route path="add-experience/step5/:id" element={<Step5 adSteps={adSteps} setAdSteps={setAdSteps} />} />
            <Route path="add-experience/step6/:id" element={<Step6 adSteps={adSteps} setAdSteps={setAdSteps} />} />
            <Route path="add-experience/step8/:id" element={<Step8 adSteps={adSteps} setAdSteps={setAdSteps} />} />
            <Route path="add-experience/step9/:id" element={<Step9 adSteps={adSteps} setAdSteps={setAdSteps} />} />
            <Route path="add-experience/last-step/:id" element={<AdLastStep adSteps={adSteps} setAdSteps={setAdSteps} />} />
            {/* <Route path="manage-listing/publish-listing/:id" element={<AdPublish />} /> */}


            <Route path="manage-listing/publish-listing/:id" element={<Publish />} />


            <Route path="page/:type" element={<ShowALlDetails />} />
            <Route path="booking-details/:id" element={<BookingDetails />} />
            <Route path="manage-listing" element={<PublishedData />} />


            {/* <...........................................> */}
            <Route path="about-us" element={<AboutUs />} />


            {/* <..............User Account..................> */}
            <Route path="account" element={<Account />} />
            <Route path="account/personal-info" element={<PersonalInfo />} />
            <Route path="account/update-password" element={<UpdatePassword />} />
            <Route path="account/payments-and-payouts" element={<Payments />} />

          </Route>

        </Routes>

      </Router>

    </div>
  );
}

export default App;
