import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import useHandleOtpVerify from "../customHook/apiCall/useHandleOtpVerify.js";


const PickupHistoryVerificationPage = ({
  setOpenClosePopcard,
  postDetails,
}) => {
  const { handleOTPVerify } = useHandleOtpVerify();
  const {
    UserDetail,
    address,
    foodExpiryTime,
    food_image_url,
    food_title,
    food_type,
    status,
    post_id,
  } = postDetails.donationPost;

  const { pickupDateTime, pickupStatus } = postDetails;

  const [otp, setOtp] = useState("");
  const [showCard, setShowCard] = useState(true); 

  const handleClose = () => {
    setShowCard(false);
    setOpenClosePopcard(false);
  };

  return (
    <PickupHistoryContainer>
      <Header>Pickup History</Header>

      {showCard && (
        <CardContainer>
          <CloseButton onClick={handleClose}>×</CloseButton>

          <ImageContainer>
            <img src={food_image_url} alt="Food" />

            {(pickupStatus === "accepted" || pickupStatus === "pending") && (
              <OTPSection>
                <OTPInput
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <SubmitButton onClick={() => handleOTPVerify(post_id, otp)}>
                  Verify OTP
                </SubmitButton>
              </OTPSection>
            )}
          </ImageContainer>

          <DetailsContainer>
            <Label>Type:</Label>
            <Value>{food_type}</Value>

            <Label>Title:</Label>
            <Value>{food_title}</Value>

            <Label>Address:</Label>
            <Value>{}</Value>

            <Label>Name:</Label>
            <Value>{UserDetail.firstName}</Value>

            <Label>Email:</Label>
            <Value>{UserDetail.emailAddress}</Value>

            <Label>Pickup Status:</Label>
            <Value>{pickupStatus}</Value>

            <Label>Pickup Timing:</Label>
            <Value>{pickupDateTime}</Value>

            <Label>Cancellation Reason:</Label>
            <Value>{"N/A"}</Value>

            {pickupStatus === "picked_up" && (
              <VerifiedText>Already Verified</VerifiedText>
            )}
          </DetailsContainer>
        </CardContainer>
      )}
    </PickupHistoryContainer>
  );
};

export default PickupHistoryVerificationPage;


const PickupHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #111;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 1000px;
  margin: auto;
`;

const Header = styled.h2`
  color: #4caf50;
  text-align: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  position: relative; /* Needed for positioning close button */
  display: flex;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
  margin-bottom: 20px;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff1a1a;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-weight: bold;
  color: #ccc;
`;

const Value = styled.span`
  color: #fff;
  margin-bottom: 10px;
`;

const OTPSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const OTPInput = styled.input`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  margin-bottom: 10px;
  width: 50%;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 200px;

  &:hover {
    background-color: #45a049;
  }
`;

const VerifiedText = styled.p`
  color: #4caf50;
  font-size: 18px;
  font-weight: bold;
`;
