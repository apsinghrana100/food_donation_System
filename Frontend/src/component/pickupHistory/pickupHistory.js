import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaHeart, FaComment, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import PickupHistoryVerificationPage from "./postVerificationpage";
import { useNavigate } from "react-router-dom";
import { convertToIST } from "../customFunction/dateFornatting";



function PickupHistoryCard({ setOpenClosePopcard, setPostDetails }) {
  const [donationData, setDonationData] = useState([]);
  const [pagenumber, SetPageNumber] = useState(0);
  const [isDonationDataAvilable, setIsDonationDataAvilable] = useState(true);
  const limit = 6;
  const scrollRef = useRef(null);
  const { accessToken,  MessageOperation,setLoader,loader ,logout } = useAuth();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL;

  const fetchPostData = async () => {
    try {
      setLoader(true);
      if (isDonationDataAvilable) {
        const response = await axios.get(
          `${baseURL}/pickups/${limit}/${pagenumber}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
              credentials: "include",
            },
          }
        );

        console.log(response.data);
        console.log("length", response.data.data.length);
        if (response.data.data.length > 0) {
          setDonationData((pre) => [...pre, ...response.data.data]);

          if (response.data.data < limit) {
            setIsDonationDataAvilable(true);
          }
          
        } else {
          setIsDonationDataAvilable(false);
        }
        MessageOperation("Successfully fetched !! ",true);
      }
    } catch (error) {
      console.log("error", error);
      MessageOperation("Problem in fetching data",false);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setTimeout(() => {
          logout();        // ✅ Logout user (clear token etc.)
          navigate("/login"); // ✅ Then redirect
        }, 2000);
      }
    } finally {
      setLoader(false);
    }
  };

  const HandleInfiniteScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    // console.log("scrollTop", scrollTop);
    // console.log("clientHeight", clientHeight);
    // console.log("scrollHeight", scrollHeight);

    // console.log()

    if (scrollTop + clientHeight + 1 >= scrollHeight) {

      if (!loader && isDonationDataAvilable) {
        SetPageNumber((pre) => pre + 1);
      }
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [pagenumber]);

  useEffect(() => {
    const currentDiv = scrollRef.current;
  
    if (currentDiv) {
      currentDiv.addEventListener("scroll", HandleInfiniteScroll);
    }

    return () => {
      if (currentDiv) {
        currentDiv.removeEventListener("scroll", HandleInfiniteScroll);
      }
    };
  }, []);

  if (!donationData) {
    return <h1>loading....</h1>;
  }

  // console.log(donationData);

  return (
    <div
      ref={scrollRef}
      style={{
        width: "100%",
        height: "100vh", // so it becomes scrollable
        overflow: "auto",
      }}
    >
      <CardGrid>
    
        {donationData?.length<=0 && <h5>Not any Pickup history avilable</h5>}
        {donationData?.map((food, id) => (
          <FoodCardDetail
            key={id}
            food={food}
            setOpenClosePopcard={setOpenClosePopcard}
            setPostDetails={setPostDetails}
          />
        ))}
      </CardGrid>
    </div>
  );
}

const FoodCardDetail = ({ food, setOpenClosePopcard, setPostDetails }) => {
  // console.log("fooddata", food);
  const {
    UserDetail,
    address,
    foodExpiryTime,
    food_image_url,
    food_title,
    food_type,
    status,
  } = food.donationPost;

  return (
    <CardContainer>
      <FoodImage src={food_image_url} alt={food_title} />
      <FoodType veg={food_type === "VEG"}>
        {food_type === "VEG" ? "🍏 Veg" : "🍖 Non-Veg"}
      </FoodType>
      <FoodDetails>
        <FoodName>{food_title}</FoodName>
        <FoodInfo>
          <FaMapMarkerAlt /> {food?.location} - {address?.address_line}
        </FoodInfo>
        <FoodInfo>
          <FaClock /> Expires in: {convertToIST(foodExpiryTime)}
        </FoodInfo>
      </FoodDetails>
      <ActionBar>
        <LikeButton>
          <FaHeart /> {food?.likes}
        </LikeButton>
        <Button
          disabled={food.status === "pending" || food.status === "picked_up" }
          status={status}
        >
          {food.pickupStatus}
        </Button>
        <CommentButton
          onClick={() => {
            setOpenClosePopcard(true);
            setPostDetails(food);
          }}
        >
          {/* <FaComment /> {food?.comments} */}More
        </CommentButton>
      </ActionBar>
    </CardContainer>
  );
};

export default PickupHistoryCard;


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
  /* cursor: pointer; */

  background-color: ${(props) =>
    props.status === "claimed" ? "#ccc" : "#4CAF50"};
  color: ${(props) => (props.status === "claimed" ? "#666" : "#fff")};
  /* cursor: ${(props) =>
    props.status === "claimed" ? "not-allowed" : "pointer"}; */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;

  &:disabled {
    opacity: 0.6;
  }
`;
