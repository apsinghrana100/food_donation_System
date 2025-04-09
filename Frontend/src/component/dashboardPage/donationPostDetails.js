import React from "react";
import styled from "styled-components";
import { validatePincode } from "../../common/PincodeChecking.js";
import usePickupHandler from "../customHook/apiCall/usePickupHnandler.js";
import { convertToIST } from "../customFunction/dateFornatting.js";

const DonationDetails = ({ setOpenClosePopcard, postDetails }) => {
  console.log(postDetails);
  const { UserDetail, address, status } = postDetails;
  const UppercaseStatus = status.toUpperCase();
  const { handlePickup } = usePickupHandler();

  const handlePincodeValidation = async (pincode) => {
    const result = await validatePincode("395010");

    if (result.error) {
      // Show error message in UI
      console.log(result.error);
    } else {
      // Update city and state fields
      console.log("City:", result.city);
      console.log("State:", result.state);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Container>
      {/* Close button */}
      <CloseButton onClick={() => setOpenClosePopcard(true)}>X</CloseButton>

      {/* Food & Donor Details Side by Side */}
      <ContentWrapper>
        {/* Food Details */}
        <FoodSection>
          <SectionTitle>Food Details</SectionTitle>

          <ImageStatusWrapper>
            <FoodImage src={postDetails.food_image_url} alt="Food" />

            <StatusWrapper>
              <Status
                onClick={() =>
                  handlePickup(
                    postDetails?.post_id,
                    postDetails.UserDetail.firstName,
                    postDetails.UserDetail.emailAddress
                  )
                }
                disabled={status === "claimed" || status === "completed"}
              >
                {UppercaseStatus}
              </Status>
              <VegTag>{postDetails.food_type}</VegTag>
              <ExpireTime>
                Expire :{convertToIST(postDetails.foodExpiryTime)}
              </ExpireTime>
            </StatusWrapper>
          </ImageStatusWrapper>

          <FoodTitle>{postDetails.food_title}</FoodTitle>
          <PostTime>Posted on: {formatDate(postDetails.created_at)}</PostTime>

          <AddressBox>
            <CityPin>{address.pincode}</CityPin>
            <FullAddress>Near Kalyani Nagar, Pune, Maharashtra</FullAddress>
          </AddressBox>
        </FoodSection>

        {/* Donor Details */}
        <DonorSection>
          <SectionTitle>Donor Details</SectionTitle>

          <DonorPhoto src={UserDetail.imageUrl} alt="Donor" />

          <DonorInfo>{UserDetail.firstName}</DonorInfo>
          <DonorInfo>{UserDetail.userName}</DonorInfo>

          <StatsWrapper>
            <StatBox>Total Posts: 25</StatBox>
            <StatBox>Impressions: 500</StatBox>
          </StatsWrapper>
        </DonorSection>
      </ContentWrapper>
    </Container>
  );
};

export default DonationDetails;

// ====================== Styled Components =========================

const Container = styled.div`
  background-color: #1e1e1e;
  color: #fff;
  max-width: 1000px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
    margin: 20px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #fff;
  background: #333;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  color: #f9a825;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

/* Food Details */
const FoodSection = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ImageStatusWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FoodImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 768px) {
    width: 160px;
    height: 120px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
`;

const Status = styled.button`
  background-color: #ff7043;
  color: #fff;
  padding: 8px 12px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
`;

const VegTag = styled.div`
  background-color: #ff5252;
  color: #fff;
  padding: 8px 12px;
  border-radius: 12px;
  text-align: center;
`;

const ExpireTime = styled.div`
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 12px;
  text-align: center;
`;

const FoodTitle = styled.h2`
  margin: 16px 0 8px;
  font-size: 22px;
  color: #fbc02d;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const PostTime = styled.div`
  color: #bbb;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AddressBox = styled.div`
  background-color: #333;
  border-radius: 12px;
  padding: 12px;
`;

const CityPin = styled.div`
  color: #00e676;
  font-weight: bold;
  margin-bottom: 8px;
`;

const FullAddress = styled.div`
  color: #ccc;
`;

/* Donor Details */
const DonorSection = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const DonorPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
  border: 3px solid #444;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const DonorInfo = styled.div`
  margin-bottom: 12px;
  color: #bbb;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const StatBox = styled.div`
  background-color: #333;
  padding: 10px 16px;
  border-radius: 12px;
  color: #fff;
  min-width: 120px;
  text-align: center;

  @media (max-width: 768px) {
    min-width: 100px;
  }
`;
