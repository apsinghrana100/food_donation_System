import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ContactPage from "./component/contactPage/contactPage.js";
import LandingPage from "./component/landingPage.js";
import LoginPage from "./component/loginPage/loginPage.js";
import LogoutPage from "./component/loginPage/logout.js";
import DarkThemeDisplay from "./component/dashboardPage/donationPostDetails.js";

import { lazy, Suspense } from "react";

const ManageFoodCard = lazy(()=>import("./component/managePost/managePost.js"))
const PickupHistoryLandingPage = lazy(()=>import("./component/pickupHistory/pickuphistoryLandingPage.js"));
const ProfilePage = lazy(()=>import("./component/userProfilePage/userProfile.js"));
const MyPickup = lazy(()=>import("./component/myPickup/myPickup.js"));
const DashBoard = lazy(()=>import("./component/dashboardPage/dashboardLandingPage.js"));
const DontaionRegistrationForm = lazy(()=>import("./component/dontationPostRegistration/dontaionPostRegistration.js"));
const ContactPage = lazy(()=>import("./component/contactPage/contactPage.js"));
const App = () => {

  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading....</div>} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testing" element={<DarkThemeDisplay />} />
        <Route index element={<LandingPage />} />
        
        <Route path="landingpage" element={<LandingPage />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="postdontation" element={<DontaionRegistrationForm />} />
          <Route path="managefoodcard" element={<ManageFoodCard/>} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="mypickup" element={<MyPickup/>} />
          <Route path="pickuphistory" element={<PickupHistoryLandingPage />} />
          <Route path="userprofile" element={<ProfilePage />} />
          
        </Route>
       
        <Route path="logout" element={<LogoutPage />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
      <Suspense />
    </BrowserRouter>
  );
};

export default App;
