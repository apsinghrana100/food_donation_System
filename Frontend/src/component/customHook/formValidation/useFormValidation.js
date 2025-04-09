import { useAuth } from "../../../context/authContext";



 const useFormValidation = () =>{
  const { setLoader} = useAuth();


 
 // Validate form before submission
 const validateForm = (formData,setErrors) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic'];
    setLoader(true);
    console.log("formvalidation",formData)
    let newErrors = {};
    if (!formData.food_expire_date.trim())
      newErrors.food_expire_date = "Select the timing";
    if (!formData.food_title.trim())
      newErrors.food_title = "Food Title Required";
    if (!formData.address_line.trim())
      newErrors.address_line = "Address Line 1 is required";
    if (!formData.address_line2.trim())
      newErrors.address_line2 = "Address Line 2 is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } 
    // else if (!isPincodeValid) {
    //   newErrors.pincode = "Invalid Pincode";
    // }
    if (!formData.file) newErrors.file = "Please choose a file";
    
    

    setErrors(newErrors);
    setLoader(false);
    return Object.keys(newErrors).length === 0; // Return true if no errors
    
  };

  return {validateForm}

}

export default useFormValidation;