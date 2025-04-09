import axios from "axios";
import { useAuth } from "../../../context/authContext";

const useUpdateProfile = () => {
  const { setLoader, MessageOperation ,setUser, accessToken} = useAuth();
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const imageUrl = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", imageUrl);

    try {
      setLoader(true);
      const output = await axios.post(
        `${baseUrl}/updateProfileImage`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
            credentials: "include",
          },
        }
      );

      console.log(output);
      setUser((pre) => ({ ...pre, picture: output.data.donwloadImagUrl }));
      MessageOperation("Picture Updated Successfully!!", true);
    } catch (error) {
      console.log(error);
      MessageOperation("Something went wrong", false);
    } finally {
      setLoader(false);
    }
  };

  const handleProfileDataUpdate = async(formdata) =>{
      
        try {
            setLoader(true);
            await axios.patch(`${baseUrl}/updateProfileData`,formdata,{
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                    credentials: "include"

                }
            })
            setUser((pre) => ({ ...pre, name:formdata.firstName,username:formdata.userName }));
            MessageOperation("Updated Successfully", true);
        } catch (error) {
          if (error.response && error.response.status === 409) {
            MessageOperation("Username already taken", false);
          } else {
            MessageOperation("Something went wrong", false);
          }
        }finally{
            setLoader(false);
        }
  };

  const getStaticdata = async(setStaticdata)=>{

    try {
        setLoader(true);
        const output=await axios.get(`${baseUrl}/getPostStaticsData`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
                credentials: "include"

            }
        }

        );
        console.log(output)
        setStaticdata(output.data.results)
       
    } catch (error) {
        MessageOperation("Ohh statics data failed", false);
    }finally{
        setLoader(false);
    }
  }

  return {
    handleImageUpload,
    handleProfileDataUpdate,
    getStaticdata
  };
};

export default useUpdateProfile;
