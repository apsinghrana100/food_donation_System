import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/authContext";
import useUpdateProfile from "../customHook/apiCall/useUpdateProfile";
const UserProfile = () => {
  const { user, MessageOperation } = useAuth();
  const [pickupEfficiency] = useState(60);
  const [isdisable, setIsdisable] = useState(true);
  const [formdata, setFormdata] = useState({
    firstName: user.name,
    userName: user.userName,
  });
  const [staticdata, setStaticdata] = useState(null);
  // const baseUrl = process.env.REACT_APP_API_URL;
  const { handleImageUpload, handleProfileDataUpdate, getStaticdata } =
    useUpdateProfile();

  useEffect(() => {
    getStaticdata(setStaticdata);
  }, []);

  useEffect(() => {
    if (formdata?.userName && formdata.userName.trim().includes(" ")) {
      MessageOperation("Space not allowed in the Username", false);
    }

    console.log(formdata?.firstName,user?.name,formdata?.userName,user?.username)

    if (
      formdata?.firstName &&
      formdata?.userName &&
      (formdata.firstName.trim() !== (user?.name) ||
      formdata.userName.trim() !== (user?.username)) &&
      !formdata.userName.trim().includes(" ")
    ) {
      setIsdisable(false);
    } else {
      setIsdisable(true);
    }
  }, [formdata, user]);

  return (
    <ProfileContainer>
      <Header>Edit Profile</Header>
      <ContentWrapper>
        <Sidebar>
          <ProfileImage imageUrl={user?.picture} />

          <UploadButton as="label">
            Upload Image
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </UploadButton>

          <StatsSection>
            <StatCard>
              <StatNumber>{staticdata?.successposts || "N/A"}</StatNumber>
              <StatLabel>Success Posts</StatLabel>
            </StatCard>

            <StatCard>
              <StatNumber>{staticdata?.totalposts || "N/A"}</StatNumber>
              <StatLabel>Total Posts</StatLabel>
            </StatCard>

            <BottomStatsRow>
              <StatCard>
                <StatNumber>{staticdata?.expiredposts || "N/A"}</StatNumber>
                <StatLabel>Expired Pickups</StatLabel>
              </StatCard>

              <StatCard>
                <StatNumber>120</StatNumber>
                <StatLabel>Impressions</StatLabel>
              </StatCard>
            </BottomStatsRow>
          </StatsSection>
        </Sidebar>

        <MainContent>
          <Form>
            <FormRow>
              <InputField
                type="text"
                // value={formdata?.name}
                placeholder="Full Name"
                defaultValue={user?.name || ""}
                onChange={(e) => {
                  setFormdata((pre) => ({ ...pre, firstName: e.target.value }));
                }}
              />
              <InputField
                type="text"
                // value={formdata?.username}
                placeholder="Username"
                defaultValue={user?.username || ""}
                onChange={(e) => {
                  setFormdata((pre) => ({ ...pre, userName: e.target.value }));
                }}
              />
            </FormRow>

            <FormRow>
              <InputField
                type="email"
                placeholder="Email Address"
                defaultValue={user?.email || ""}
                disabled={true}
              />
              <InputField
                type="tel"
                placeholder="Phone Number"
                defaultValue="+91 987xxxxxx coming soon"
                disabled={true}
              />
            </FormRow>

            <UpdateButton
              onClick={() => handleProfileDataUpdate(formdata)}
              disabled={isdisable}
            >
              Update Profile
            </UpdateButton>
          </Form>

          <div style={{ marginTop: "25px" }}>
            <div style={{ fontSize: "0.9rem", marginBottom: "6px" }}>
              Pickup Efficiency
            </div>
            <ProgressBarWrapper>
              <Progress width={`${pickupEfficiency}%`} />
            </ProgressBarWrapper>
          </div>
        </MainContent>
      </ContentWrapper>
    </ProfileContainer>
  );
};

export default UserProfile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 1000px; /* reduced width */
  margin: auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
`;

const Header = styled.h2`
  color: #4caf50;
  font-size: 1.8rem; /* reduced size */
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 2;
`;

const ProfileImage = styled.div`
  width: 120px; /* reduced size */
  height: 120px; /* reduced size */
  background-color: #333;
  border-radius: 50%;
  margin-bottom: 10px;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border: 2px solid #4caf50;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 8px 16px; /* reduced padding */
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 0.9rem; /* reduced size */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const BottomStatsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatCard = styled.div`
  background-color: #2a2a2a;
  color: #ffffff;
  padding: 10px; /* reduced padding */
  border-radius: 10px;
  text-align: center;
  flex: 1;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }
`;

const StatNumber = styled.div`
  font-size: 1.5rem; /* reduced size */
  color: #4caf50;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.8rem; /* reduced size */
  color: #ccc;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px; /* reduced padding */
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const UpdateButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 16px; /* reduced padding */
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 8px;
  width: 140px; /* reduced width */
  font-size: 0.9rem; /* reduced font size */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const ProgressBarWrapper = styled.div`
  background-color: #333;
  border-radius: 8px;
  overflow: hidden;
  height: 10px; /* reduced height */
  margin-top: 8px;
  margin-bottom: 20px;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${({ width }) => width};
  transition: width 1s ease;
`;
