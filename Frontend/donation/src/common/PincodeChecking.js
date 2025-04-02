import axios from "axios";

export const validatePincode = async (pincode) => {
    try {
     
  
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
  
      const data = response.data[0];
  
      if (data.Status === "Error" || !data.PostOffice) {
        // Error in response or no post office found
        console.log("Invalid Pincode");
        
        // Example: show error to user or return null
        return { city: null, state: null, error: "Invalid Pincode" };
      } else {
        // Success - extract city (District) and state from the first PostOffice entry
        const postOffice = data.PostOffice[0]; // You can choose which one to use or show options
        
        const city = postOffice.District;
        const state = postOffice.State;
  
        console.log(`City: ${city}, State: ${state}`);
        
        // Example: clear error and update UI with city/state
        return { city, state, error: null };
      }
    } catch (error) {
      console.error("Error fetching pincode info:", error.message);
      
      return { city: null, state: null, error: "Something went wrong!" };
    } 
  };
  