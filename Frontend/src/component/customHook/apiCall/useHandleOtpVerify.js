import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import axios from "axios";

const useHandleOtpVerify = () => {
  const { accessToken, setLoader, MessageOperation, logout } = useAuth();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL;

  const handleOTPVerify = async (postId, otp) => {
    setLoader(true);
    console.log("postid", postId);
    try {
      const response = await axios.post(
        `${baseURL}/productVerify`,
        {
          postId,
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            credentials: "include",
          },
        }
      );

      if (response.data.success) {
        MessageOperation("otp matched successfully", true);
      }
    } catch (error) {
      MessageOperation("Invalid otp", false);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setTimeout(() => {
          logout();
          navigate("/login");
        }, 2000);
      }
    } finally {
      setLoader(false);
    }
  };

  return { handleOTPVerify };
};

export default useHandleOtpVerify;
