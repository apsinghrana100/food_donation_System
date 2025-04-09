import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  ContentContainer,
  DashboardLayout,
  MainDashboardContainer,
  NavBar,
  NavbarLogo,
  NavbarRightSection,
  SideBar,
  SideBarItem,
} from "./landingPage.styles";
import LoginPage from "./loginPage/loginPage";
import { MessagePopUp } from "../common/MessagePopUp.js";
import FoodDonationLoader from "../common/FoodDonationLoader.js";
import LandingPageStaticData from "./landingPageStatic.js";
import { jwtDecode } from "jwt-decode";

const LandingPage = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const { login, logout, accessToken, user, loader, setLoader, MessagePop, setMessagePop, MessageOperation, message } = useAuth();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname.split('/').filter(Boolean).pop());
  const baseURL = process.env.REACT_APP_API_URL;
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseURL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.data) {
        setLoggedOut(true);
        logout();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      const uncodeded = JSON.stringify(jwtDecode(accessToken));
      // console.log(uncodeded);
      localStorage.setItem("userDetails",JSON.stringify(jwtDecode(accessToken)))
      login(accessToken);
      window.history.replaceState({}, document.title, "/landingpage");
    }
  }, []);

  if (loggedOut) {
    return <Navigate to="/login" />;
  }
  

  return (
    !accessToken ? <LoginPage /> :

      <MainDashboardContainer>
        {loader && <FoodDonationLoader />}
        {MessagePop && <MessagePopUp message={message} />}

        <NavBar>
          <NavbarLogo>FOOD DONATION</NavbarLogo>
          <NavbarRightSection>
            <span onClick={handleSidebarToggle}>☰ Menu</span>
            <span>👤 {user?.name || 'Ajay'}</span>
            <span onClick={handleLogout}>🚪 Logout</span>
          </NavbarRightSection>
        </NavBar>

        <DashboardLayout>
          <SideBar isOpen={sidebarOpen}>
            <SideBarItem isActive={currentUrl === "dashboard"} onClick={() => { navigate("/landingpage/dashboard"); setCurrentUrl("dashboard"); setSidebarOpen(false); }}>📊 Dashboard</SideBarItem>
            <SideBarItem isActive={currentUrl === "postdontation"} onClick={() => { navigate("/landingpage/postdontation"); setCurrentUrl("postdontation"); setSidebarOpen(false); }}>➕ Post Donation</SideBarItem>
            <SideBarItem isActive={currentUrl === "managefoodcard"} onClick={() => { navigate("/landingpage/managefoodcard"); setCurrentUrl("managefoodcard"); setSidebarOpen(false); }}>🛠️ Manage Post</SideBarItem>
            <SideBarItem isActive={currentUrl === "pickuphistory"} onClick={() => { navigate("/landingpage/pickuphistory"); setCurrentUrl("pickuphistory"); setSidebarOpen(false); }}>➕ Pickup History</SideBarItem>
            <SideBarItem isActive={currentUrl === "mypickup"} onClick={() => { navigate("/landingpage/mypickup"); setCurrentUrl("mypickup"); setSidebarOpen(false); }}>🛠️ My Donation</SideBarItem>
            <SideBarItem isActive={currentUrl === "userprofile"} onClick={() => { navigate("/landingpage/userprofile"); setCurrentUrl("userprofile"); setSidebarOpen(false); }}>👤 Profile</SideBarItem>
            <SideBarItem onClick={handleLogout}>🚪 Logout</SideBarItem>
          </SideBar>

          <ContentContainer>
            <Outlet />
            {currentUrl === "landingpage" && <LandingPageStaticData />}
          </ContentContainer>
        </DashboardLayout>
      </MainDashboardContainer>
  );
};

export default LandingPage;
