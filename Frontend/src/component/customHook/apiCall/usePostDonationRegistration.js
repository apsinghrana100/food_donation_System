import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext.js";
import useFormValidation from "../formValidation/useFormValidation.js";

const usePostDonationRegistration = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { user, accessToken, setLoader, MessageOperation, logout } = useAuth();
  const navigate = useNavigate();
  const { validateForm } = useFormValidation();

  const handleOnSubmit = async (formData, setErrors) => {
    console.log("data", formData);

    if (!validateForm(formData, setErrors)) {
      setLoader(false);
      return;
    }
    try {
      setLoader(true);
      const response = await axios.post(
        `${baseURL}/postDonation`, // Fixed the URL syntax
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add token here
            "Content-Type": "multipart/form-data", // Ensure proper content type if sending files
            credentials: "include",
          },
        }
      );
      if (response.status) {
        MessageOperation("Successfully inserte !!", true);
      }
    } catch (error) {
      MessageOperation("Something Went Wrong !!", false);
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
  return { handleOnSubmit };
};

export default usePostDonationRegistration;
