import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaHeart, FaComment, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import usePickupHandler from "../customHook/apiCall/usePickupHnandler";
import { convertToIST } from "../customFunction/dateFornatting";
import useFetchPostData from "../customHook/apiCall/useFetchPostData";

function FoodCard({ setOpenClosePopcard, setPostDetails }) {
  const [donationData, setDonationData] = useState([]);
  const [pagenumber, SetPageNumber] = useState(0);
  const { fetchPostData } = useFetchPostData();
  const { handlePickup } = usePickupHandler();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackfunction = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && isVisible) {
        SetPageNumber((prev) => prev + 1);
      }
    },
    [SetPageNumber, isVisible]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px 0px 10px 0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(callbackfunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, callbackfunction]);

  useEffect(() => {
    fetchPostData(pagenumber, setDonationData, setIsVisible);
  }, [pagenumber]);

  if (!donationData) {
    return <h1>loading....</h1>;
  }

  return (
    <CardGrid>
      {donationData?.length <= 0 && <h1>No data avilable</h1>}
      {donationData?.map((food, id) => (
        <FoodCardDetail
          key={id}
          food={food}
          setOpenClosePopcard={setOpenClosePopcard}
          setPostDetails={setPostDetails}
          handlePickup={handlePickup}
        />
      ))}
      {<div ref={containerRef}>{isVisible && <h1>Loading</h1>}</div>}
    </CardGrid>
  );
}

const FoodCardDetail = ({
  food,
  setOpenClosePopcard,
  setPostDetails,
  handlePickup,
}) => {
  // console.log("fooddata",food)
  const UppercaseStatus = food?.status.toUpperCase();

  return (
    <CardContainer>
      <FoodImage src={food?.food_image_url} alt={food?.food_title} />
      <FoodType veg={food?.food_type === "VEG" ? true : false}>
        {food?.food_type === "VEG" ? "🍏 Veg" : "🍖 Non-Veg"}
      </FoodType>
      <FoodDetails>
        <FoodName>{food?.food_title}</FoodName>
        <FoodInfo>
          {/* <FaMapMarkerAlt /> {food?.location} - {food?.address.address_line} */}
        </FoodInfo>
        <FoodInfo>
          <FaClock /> Expires in: {convertToIST(food?.foodExpiryTime)}
        </FoodInfo>
      </FoodDetails>
      <ActionBar>
        <LikeButton>
          <FaHeart /> {food?.likes}
        </LikeButton>
        <Button
          onClick={() =>
            handlePickup(
              food?.post_id,
              food?.UserDetail.firstName,
              food?.UserDetail.emailAddress
            )
          }
          disabled={food.status === "claimed" || food.status === "completed"}
          status={food.status}
        >
          {UppercaseStatus}
        </Button>
        <CommentButton
          onClick={() => {
            setOpenClosePopcard(false);
            setPostDetails(food);
          }}
        >
          {/* <FaComment /> {food?.comments} */}More
        </CommentButton>
      </ActionBar>
    </CardContainer>
  );
};

export default FoodCard;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  justify-items: center;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 2px;
  }
`;
// Styled Components
const CardContainer = styled.div`
  position: relative;
  width: 300px;
  /* max-height: 400px; */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FoodImage = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  aspect-ratio: 16/9;
`;

const FoodType = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: ${(props) => (props.veg ? "#4CAF50" : "#F44336")};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const FoodDetails = styled.div`
  padding: 15px;
`;

const FoodName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
`;

const FoodInfo = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666666;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-top: 1px solid #eeeeee;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff3b3b;
  }
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #357abd;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  /* color:black; */
  border-radius: 10px;
  cursor: pointer;

  background-color: ${(props) =>
    props.status === "claimed" ? "#ccc" : "#4CAF50"};
  color: ${(props) => (props.status === "claimed" ? "#666" : "#fff")};
  cursor: ${(props) =>
    props.status === "claimed" ? "not-allowed" : "pointer"};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;

  &:disabled {
    opacity: 0.6;
  }
`;
