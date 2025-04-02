import { createContext, useContext, useState } from "react";

const UserDonationPostData = createContext();

export const UserDonationPostDataContext = ({ children }) => {
  const [donationData, setDonationData] = useState([]);
  const [mypickupdata, setMypickUpdata] = useState([]);
  return (
    <>
      <UserDonationPostData.Provider
        value={{ donationData, setDonationData, mypickupdata, setMypickUpdata }}
      >
        {children}
      </UserDonationPostData.Provider>
    </>
  );
};

export const useUserDonationData = () => {
  return useContext(UserDonationPostData);
};
