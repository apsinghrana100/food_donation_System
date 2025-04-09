import styled from "styled-components";

// Main Dashboard Container
export const MainDashboardContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #0f0f0f;
    color: #fdfcfc;
    font-family: 'Poppins', sans-serif;
`;

// Top Navigation Bar
export const NavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1a1a1a;
    color: #ffffff;
    width: 100%;
    padding: 15px 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`;

// Logo
export const NavbarLogo = styled.span`
    font-size: 28px;
    font-weight: 700;
    color: #4caf50;
    text-transform: uppercase;
    letter-spacing: 1.5px;
`;

// Right Section of Navbar (User Info, Logout)
export const NavbarRightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 16px;
    color: #e0e0e0;
    

    span {
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
            color: #4caf50;
        }
    }
`;

// Sidebar
export const SideBar = styled.div`

    width: 250px;
    height: 100%;
    background-color: #1a1a1a;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`;

// Sidebar Items
export const SideBarItem = styled.div`
    padding: 12px 15px;
    margin: 8px 0;
    color: #e0e0e0;
    font-size: 16px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    background-color: ${({ isActive }) => (isActive ? "#4caf50" : "transparent")};

    &:hover {
        background-color: #4caf50;
        color: #ffffff;
        transform: translateX(5px);
    }
`;

// Main Content Area
export const ContentContainer = styled.div`
    flex-grow: 1;
    background-color: #0f0f0f;
    padding: 30px;
    color: #ffffff;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow: scroll;
    
`;

// Main Dashboard Layout
export const DashboardLayout = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 70px);
`;