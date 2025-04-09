import { useState } from "react";
import axios from "axios";
import {
  Filefield,
  InputFields,
  OptionField,
  RegistrationCard,
  RegistrationPageContent,
  SelectFields,
  Title,
  SubmitButton,
  ErrorText,
  WrapInputErrorMessage,
  WrapTwoInputBox,
} from "./dontaionPostRegistration.styles";
import { useAuth } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import usePostDonationRegistration from "../customHook/apiCall/usePostDonationRegistration.js";


const DontaionRegistrationForm = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const {
    user,
    accessToken,
    setLoader,
    setMessagePop,
    message,
    setMessage,
    MessageOperation,
    logout,
  } = useAuth();
  const [inputType, setInputType] = useState("text");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    food_title: "",
    food_expire_date: "",
    address_line: "",
    address_line2: "",
    pincode: "",
    food_type: "VEG",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("No file chosen");
  const [isPincodeValid, setIsPincodeValid] = useState(null); // null = not checked

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file?.name || "No file chosen");
    setFormData((prev) => ({ ...prev, file }));
    setErrors((prev) => ({ ...prev, file: "" })); // Clear file error
  };

  // Validate Pincode
  const validatePincode = async () => {
    if (!formData.pincode) {
      setIsPincodeValid(null);
      return;
    }

    try {
      setLoader(true);
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${formData.pincode}`
      );
      if (response.data[0].Status === "Error") {
        setIsPincodeValid(false);
        setErrors((prev) => ({ ...prev, pincode: "Invalid Pincode" }));
        MessageOperation("Invalid Pincode", false);
      } else {
        setIsPincodeValid(true);
        setErrors((prev) => ({ ...prev, pincode: "" })); // Clear pincode error
      }
    } catch (error) {
      setIsPincodeValid(false);
      setErrors((prev) => ({ ...prev, pincode: "Invalid Pincode" }));
      MessageOperation("Invalid Pincode", false);
    } finally {
      setLoader(false);
    }
  };
  
  //handle the inputbox type change
  const handleFocus = () => {
    setInputType("datetime-local");
  };

  // If input is empty when losing focus, change back to "text"
  const handleBlur = () => {
    if (!formData.food_expire_date) {
      setInputType("text");
    }

    if (formData.food_expire_date) {
      const foodExpireDate = new Date(formData.food_expire_date).getTime();

      if (foodExpireDate < Date.now()) {
        MessageOperation("Date and Time should be future date!!", false);
      }
    }
  };

  // Handle form submission
  const {handleOnSubmit} = usePostDonationRegistration();
 
  return (
    <>
      <RegistrationPageContent>
        <RegistrationCard>
          <Title>Post a Food Donation</Title>

          <WrapTwoInputBox>
            <WrapInputErrorMessage>
              <InputFields
                name="food_title"
                placeholder="Food Title (Rice,Pluse,Chiken..)"
                value={formData.food_title}
                onChange={handleChange}
              />
              {errors.food_title && <ErrorText>{errors.food_title}</ErrorText>}
            </WrapInputErrorMessage>
            {/* Address Line 2 */}

            <WrapInputErrorMessage>
              <InputFields
                type={inputType}
                name="food_expire_date"
                placeholder="Plese select Food expiry date"
                value={formData.food_expire_date}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                // onClick={onhandleclickDate}
              />
              {errors.food_expire_date && (
                <ErrorText>{errors.food_expire_date}</ErrorText>
              )}
            </WrapInputErrorMessage>
          </WrapTwoInputBox>

          {/* Address Line 1 */}

          <WrapTwoInputBox>
            <WrapInputErrorMessage>
              <InputFields
                name="address_line"
                placeholder="Address Line 1"
                value={formData.address_line}
                onChange={handleChange}
              />
              {errors.address_line && (
                <ErrorText>{errors.address_line}</ErrorText>
              )}
            </WrapInputErrorMessage>
            {/* Address Line 2 */}

            <WrapInputErrorMessage>
              <InputFields
                name="address_line2"
                placeholder="Address Line 2"
                value={formData.address_line2}
                onChange={handleChange}
              />
              {errors.address_line2 && (
                <ErrorText>{errors.address_line2}</ErrorText>
              )}
            </WrapInputErrorMessage>
          </WrapTwoInputBox>
          {/* Pincode with validation inside */}

          <WrapTwoInputBox>
            <WrapInputErrorMessage>
              <InputFields
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                onBlur={validatePincode}
                maxLength={6}
              />
              {errors.pincode && <ErrorText>{errors.pincode}</ErrorText>}
            </WrapInputErrorMessage>

            {/* Food Type Selection */}
            <WrapInputErrorMessage>
              <SelectFields
                name="food_type"
                value={formData.food_type}
                onChange={handleChange}
              >
                <OptionField value="VEG">Veg</OptionField>
                <OptionField value="NON-VEG">Non-Veg</OptionField>
              </SelectFields>
            </WrapInputErrorMessage>
          </WrapTwoInputBox>
          {/* File Upload */}
          <WrapInputErrorMessage>
            <Filefield id="file-upload" onChange={handleFileChange} />
            <label htmlFor="file-upload">📂 Choose Food Photo</label>
            {errors.file && <ErrorText>{errors.file}</ErrorText>}
            <p style={{ fontSize: "14px", color: "#ccc" }}>{fileName}</p>
          </WrapInputErrorMessage>
          {/* Submit Button */}
          <SubmitButton onClick={()=>handleOnSubmit(formData,setErrors)}>Submit Donation</SubmitButton>
        </RegistrationCard>
      </RegistrationPageContent>
    </>
  );
};

export default DontaionRegistrationForm;
