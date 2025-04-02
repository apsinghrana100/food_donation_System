import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL; // ✅ Corrected baseURL

const usePickupHandler = () => {
  const navigate = useNavigate();
  const { accessToken, setLoader, MessageOperation, logout } = useAuth();

  const handlePickup = async (postId, donername, doneremail) => {
    try {
      setLoader(true);

      await axios.post(
        `${baseURL}/PostPickupUpdate`,
        {
          postId,
          donername,
          doneremail,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            credentials: "include",
          },
        }
      );

      MessageOperation("Picked successfully", true);
    } catch (error) {
      MessageOperation("Error in Picking Donation", false);

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

  return { handlePickup };
};

export default usePickupHandler;
