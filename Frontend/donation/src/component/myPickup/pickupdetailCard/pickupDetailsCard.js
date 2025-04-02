import React, { useEffect, useState } from "react";
import {
  CardContainer,
  CloseButton,
  StatusBar,
  StatusStep,
  StatusLine,
  DetailsWrapper,
  PostDetails,
  PostImage,
  PostInfo,
  InfoRow,
  Label,
  Value,
  PickerDetails,
  PickerTitle,
  PickerImage,
  PickerInfo,
  PickerRow,
  PickerLabel,
  PickerValue,
} from "./pickupDetailsCard.styles";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const PickupCard = ({ setOpen, postId }) => {
  const [pickupData, setPickupData] = useState(null);
  const { setLoader, MessageOperation } = useAuth();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoader(true);
    const fetchPickupData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/donation-posts/${postId}`);
        if (data.success) {
          setPickupData(data.data);
        }
      } catch (error) {
        MessageOperation("Error fetching pickup data", false);
        if (error.response?.status === 403 || error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoader(false);
      }
    };

    if (postId) fetchPickupData();
  }, [postId]);

  if (!pickupData) {
    return (
      <CardContainer>
        <CloseButton onClick={() => setOpen(false)}>X</CloseButton>
        <p>No data available.</p>
      </CardContainer>
    );
  }

  const {
    food_title,
    food_type,
    food_image_url,
    post_status,
    address,
    postPickupDetails,
    foodExpiryTime
  } = pickupData;

  const picker = postPickupDetails && postPickupDetails.length > 0 ? postPickupDetails[0] : null;
  const user = picker?.userDetail;
  const pickupTimeExpired = foodExpiryTime
    ? new Date(foodExpiryTime).getTime() < new Date().getTime()
    : false;

  const statusSteps = ["available", "claimed", "completed", "expired"];

  // Function to determine the color of the step
  const getStepColor = (status) => {
    if (pickupTimeExpired) {
      if (post_status === "expired" && picker?.pickupStatus === "accepted") {
        // If food is expired or available but expired, mark claimed, completed, and expired as red
        if (["completed", "expired"].includes(status)) return "red";
      }

      if (post_status === "expired" || post_status === "available") {
        // If food is expired or available but expired, mark claimed, completed, and expired as red
        if (["claimed", "completed", "expired"].includes(status)) return "red";
      }
  
      if (post_status === "claimed") {
        // If food is claimed but expired, mark completed and expired as red
        if (["completed", "expired"].includes(status)) return "red";
      }

    }
  
    if (post_status === "completed") {
      // If food is completed successfully, hide expired
      if (status === "expired") return "hidden";
    }
  
    if (post_status === "claimed") {
      // Mark available, claimed, and completed as green
      if (["available", "claimed"].includes(status)) return "green";
    }

    if (post_status === "completed") {
      // Mark available, claimed, and completed as green
      if (["available", "claimed", "completed"].includes(status)) return "green";
    }
  
    return "default";
  };
  

  return (
    <CardContainer>
      <CloseButton onClick={() => setOpen(false)}>X</CloseButton>

      {/* Status Bar */}
      <StatusBar>
        {statusSteps.map((status, index) => {
          const color = getStepColor(status);

          if (color === "hidden") return null;

          return (
            <React.Fragment key={index}>
              <StatusStep
                active={post_status === status || statusSteps.indexOf(post_status) >= index}
                color={color}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </StatusStep>
              {index !== statusSteps.length - 1 && <StatusLine />}
            </React.Fragment>
          );
        })}
      </StatusBar>

      <DetailsWrapper>
        {/* Post Details */}
        <PostDetails>
          <PostImage
            src={food_image_url || "https://via.placeholder.com/150"}
            alt="Donation"
          />
          <PostInfo>
            <InfoRow>
              <Label>Type:</Label>
              <Value>{food_type || "N/A"}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Title:</Label>
              <Value>{food_title || "N/A"}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Address:</Label>
              <Value>
                {address
                  ? `${address.address_line}, ${address.address_line2}, ${address.pincode}`
                  : "N/A"}
              </Value>
            </InfoRow>
            <InfoRow>
              <Label>Food Expiry:</Label>
              <Value>
                { new Date(foodExpiryTime).toLocaleString()}
              </Value>
            </InfoRow>
          </PostInfo>
        </PostDetails>

        {/* Picker Details */}
        <PickerDetails>
          <PickerTitle>Picker Details</PickerTitle>
          <PickerImage
            src={user?.imageUrl || "https://via.placeholder.com/150"}
            alt="Picker"
          />
          <PickerInfo>
            <PickerRow>
              <PickerLabel>Name:</PickerLabel>
              <PickerValue>{user?.firstName || "N/A"}</PickerValue>
            </PickerRow>
            <PickerRow>
              <PickerLabel>Email:</PickerLabel>
              <PickerValue>{user?.emailAddress || "N/A"}</PickerValue>
            </PickerRow>
            <PickerRow>
              <PickerLabel>Pickup Status:</PickerLabel>
              <PickerValue>{picker?.pickupStatus || "N/A"}</PickerValue>
            </PickerRow>
            <PickerRow>
              <PickerLabel>Pickup Timing:</PickerLabel>
              <PickerValue>
                {picker?.pickupDateTime
                  ? new Date(picker?.pickupDateTime).toLocaleString()
                  : "N/A"}
              </PickerValue>
            </PickerRow>
            <PickerRow>
              <PickerLabel>Cancellation Reason:</PickerLabel>
              <PickerValue>{picker?.cancellationReason || "None"}</PickerValue>
            </PickerRow>
          </PickerInfo>
        </PickerDetails>
      </DetailsWrapper>
    </CardContainer>
  );
};

export default PickupCard;
