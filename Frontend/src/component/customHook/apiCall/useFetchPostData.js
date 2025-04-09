import axios from "axios";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const useFetchPostData = () => {
  const limit = 6;
  const navigate = useNavigate();
  const { accessToken, loader, setLoader, MessageOperation, logout } =
    useAuth();
  const baseURL = process.env.REACT_APP_API_URL;

  //NOte: useCallback if you are using this code inside of any component directly.
  const fetchPostData = 
    async (pagenumber, setDonationData, setIsVisible) => {
      try {
        setLoader(true);

        const response = await axios.get(
          `${baseURL}/postDonation/${limit}/${pagenumber}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              credentials: "include",
            },
          }
        );

        if (response.data.data.length > 0) {
          setDonationData((pre) => [...pre, ...response.data.data]);
          setIsVisible(true);
          if (response?.data.data.length < limit) {
            setIsVisible(false);
          }
        }
      } catch (error) {
        MessageOperation("Something went Wrong", false);
        if (error.response?.status === 403 || error.response?.status === 401) {
          setTimeout(() => {
            logout(); // ✅ Logout user (clear token etc.)
            navigate("/login"); // ✅ Then redirect
          }, 2000);
        }
      } finally {
        setLoader(false);
      }
    };

  return { fetchPostData };
};

export default useFetchPostData;
