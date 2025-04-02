import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { convertToIST } from "../customFunction/dateFornatting.js";
import useFetchPostByUserId from "../customHook/apiCall/usefetchPostByUserId.js";
import { useUserDonationData } from "../../context/userDonationPostDataContext.js";

function ManageFoodCard() {
  const { donationData, setDonationData } = useUserDonationData();
  const baseURL = process.env.REACT_APP_API_URL;
  const { onhandleDeletePost, fetchPostData } = useFetchPostByUserId();
  const [pageNumber, setPageNumber] = useState(0);
  const limit = 6;
  const status = "available";
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const PostDonationUrl = `${baseURL}/postDonationById/${limit}/${pageNumber}?status=${status}`;

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px 10px 0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && isVisible) {
        setPageNumber((pre) => pre + 1);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, isVisible]);

  useEffect(() => {
    fetchPostData(PostDonationUrl, setIsVisible, setDonationData);
  }, [pageNumber]);

  return (
    <CardGrid>
      {donationData?.length <= 0 && (
        <h5>You had not Donate any things yet. Let's Server love</h5>
      )}
      {donationData?.map((food, index) => (
        <FoodCardDetail
          key={index}
          food={food}
          onhandleDeletePost={onhandleDeletePost}
        />
      ))}
      {isVisible && <div ref={containerRef}>Loading....</div>}
    </CardGrid>
  );
}

const FoodCardDetail = React.memo(({ food, onhandleDeletePost }) => {
  return (
    <CardContainer>
      <FoodImage src={food?.food_image_url} alt={food?.food_title} />
      <FoodType veg={food?.food_type === "VEG"}>
        {food?.food_type === "VEG" ? "🍏 Veg" : "🍖 Non-Veg"}
      </FoodType>
      <FoodDetails>
        <FoodName>{food?.food_title}</FoodName>
        <FoodInfo>
          <FaMapMarkerAlt /> {food?.location} - {food?.address.address_line}
        </FoodInfo>
        <FoodInfo>
          <FaClock /> Expires in: {convertToIST(food?.foodExpiryTime)}
        </FoodInfo>
      </FoodDetails>
      <ActionBar>
        <EditButton>🛠️ Edit</EditButton>
        <DeleteButton onClick={() => onhandleDeletePost(food.post_id)}>
          🗑️ Delete
        </DeleteButton>
      </ActionBar>
    </CardContainer>
  );
});

export default ManageFoodCard;

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
  top: 10px;
  right: 10px;
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  justify-items: center;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 20px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 2px;
  }
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

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #ffa500; /* Orange for edit */
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c00;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #ff6b6b; /* Red for delete */
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff3b3b;
  }
`;

// Update ActionBar
const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-top: 1px solid #eeeeee;
`;
