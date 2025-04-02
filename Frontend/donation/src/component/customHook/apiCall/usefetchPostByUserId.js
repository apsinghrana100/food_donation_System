
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext.js";
import axios from "axios";
import { useUserDonationData } from "../../../context/userDonationPostDataContext.js";

const useFetchPostByUserId = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { setLoader, logout, MessageOperation,accessToken } = useAuth();
  const navigate = useNavigate();
  const status = "available";
  const {setDonationData}=useUserDonationData();

  const fetchPostData = async (url,setIsVisible,setdata) => {
   
    try {
      setLoader(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: "include",
        },
      });
      console.log(response.data.data);
      if(response.data.data.length > 0){
        setdata( (pre) => [...pre, ...response.data.data]);
        setIsVisible(true);

        if(response.data.data.length <6){
          setIsVisible(false);
        }
      }else{
        setIsVisible(false);
      }
      
    } catch (error) {
      MessageOperation("Problem in fetch Data", false);
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


  const onhandleDeletePost = async (postId) => {
      try {
        setLoader(true);
        const response = await axios.delete(`${baseURL}/postDonation/${postId}`);
        MessageOperation("Delete Successfully", true);
        fetchPostData(`${baseURL}/postDonation?status=${status}`);
      } catch (error) {
        MessageOperation("Error in Deletion", false);
        if (error.response?.status === 403 || error.response?.status === 401) {
          navigate("/login"); // ✅ redirect if unauthorized or forbidden
        }
      } finally {
        setLoader(false);
      }
    };

  return { fetchPostData ,onhandleDeletePost};
};

export default useFetchPostByUserId;
