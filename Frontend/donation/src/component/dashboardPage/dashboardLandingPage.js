import { useState } from "react";
import FoodCard from "../foodCardPage/foodCardPage";
import DonationPostDetails from "./donationPostDetails";

const DashBoard = () => {
  const [openClosePopcard, setOpenClosePopcard] = useState(true);
  const [postDetails, setPostDetails] = useState(null);

  const renderContent = () => {
    if (openClosePopcard) {
      return (
        <FoodCard
          setOpenClosePopcard={setOpenClosePopcard}
          setPostDetails={setPostDetails}
        />
      );
    }
    return (
      <DonationPostDetails
        setOpenClosePopcard={setOpenClosePopcard}
        postDetails={postDetails}
      />
    );
  };

  return <div>{renderContent()}</div>;
};

export default DashBoard;
