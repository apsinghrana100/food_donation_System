import { useState } from "react";
import PickupHistoryCard from "./pickupHistory.js";
import PickupHistoryVerificationPage from "./postVerificationpage.js";

const PickupHistoryLandingPage = () => {
  const [openClosePopcard, setOpenClosePopcard] = useState(false);
  const [postDetails, setPostDetails] = useState([]);
  return (
    <>
      {openClosePopcard ? (
        <PickupHistoryVerificationPage
          setOpenClosePopcard={setOpenClosePopcard}
          postDetails={postDetails}
        />
      ) : (
        <PickupHistoryCard
          setOpenClosePopcard={setOpenClosePopcard}
          setPostDetails={setPostDetails}
        />
      )}
    </>
  );
};

export default PickupHistoryLandingPage;
